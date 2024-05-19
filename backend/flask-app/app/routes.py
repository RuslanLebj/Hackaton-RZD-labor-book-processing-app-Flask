from flask import send_file
from flask_cors import CORS, cross_origin
from schemas import *
from config import *
from zipfile import ZipFile
from flask import Flask, request, jsonify
from models import EmployeeModel
from flask_swagger_ui import get_swaggerui_blueprint


app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins=[
  'http://localhost:3000',
])
UPLOAD_FOLDER = 'uploads'


@app.route('/test')
def test():
    return 'ok'


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    if filename.endswith('.zip'):
        with ZipFile(file_path, 'r') as zip_ref:
            zip_ref.extractall(UPLOAD_FOLDER)
        os.remove(file_path)
        data = process_images_from_zip(UPLOAD_FOLDER)
    else:
        data = process_single_image(file_path)

    employee_data = data.get('employee')
    if not employee_data:
        return jsonify({'error': 'No employee data found'}), 400

    employee = EmployeeModel(**employee_data)
    db.session.add(employee)
    db.session.commit()

    employee_id = employee.id
    employee_folder = os.path.join(UPLOAD_FOLDER, str(employee_id))
    os.makedirs(employee_folder)

    for image_data in data.get('images', []):
        image_path = os.path.join(employee_folder, image_data['filename'])
        with open(image_path, 'wb') as img_file:
            img_file.write(image_data['data'])

    if 'job_information' in data:
        for job_info in data['job_information']:
            job_info['employee_id'] = employee_id
            job = JobInformation(**job_info)
            db.session.add(job)

    if 'awards' in data:
        for award_info in data['awards']:
            award_info['employee_id'] = employee_id
            award = Award(**award_info)
            db.session.add(award)

    db.session.commit()

    return jsonify({'employee_id': employee_id}), 200


@app.route('/data/<int:id>/xlsx')
def get_data_xlsx(id):
    employee = EmployeeModel.query.get(id)
    if not employee:
        return jsonify({'error': 'Employee not found'}), 404

    output = generate_xlsx(employee)

    return send_file(
        output,
        download_name=f'employee_{id}.xlsx',
        as_attachment=True,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )


@app.route('/data/<int:id>/json')
def get_data_json(id):
    employee = EmployeeModel.query.get(id)
    if not employee:
        return jsonify({'error': 'Employee not found'}), 404

    return jsonify(employee.to_dict())


@app.route('/all', methods=['GET'])
def get_all_ids():
    employees = EmployeeModel.query.all()
    data = jsonify([employee.to_dict() for employee in employees])
    data.headers.add('Access-Control-Allow-Origin', '*')
    return data


@app.route('/data/<int:id>/update', methods=['PUT'])
def update_employee(id):
    data = decode_json(request.json)

    JobInformation.query.filter_by(employee_id=id).delete()
    Award.query.filter_by(employee_id=id).delete()

    employee = EmployeeModel.query.get(id)
    if not employee:
        return jsonify({'error': 'Employee not found'}), 404

    update_employee_data(employee, data)
    db.session.commit()

    if 'job_information' in data:
        insert_job_information(id, data['job_information'])

    if 'awards' in data:
        insert_awards(id, data['awards'])

    db.session.commit()

    return jsonify(employee.to_dict()), 200


@app.route('/data/<int:employee_id>/images', methods=['GET'])
def get_images(employee_id):
    employee_folder = os.path.join(UPLOAD_FOLDER, str(employee_id))
    if not os.path.exists(employee_folder):
        return jsonify({'error': 'Folder not found'}), 404

    images = []
    for filename in os.listdir(employee_folder):
        if filename.endswith(('.jpg', '.jpeg', '.png', '.svg')):
            images.append(filename)

    if not images:
        return jsonify({'error': 'No images found'}), 404

    return jsonify({'images': images}), 200


@app.route('/data/insert', methods=['POST'])
def insert_data():
    data = request.json

    employee = EmployeeModel(
        series=data['series'],
        number=data['number'],
        surname=data['surname'],
        name=data['name'],
        patronymic=data['patronymic'],
        birth_year=data['birth_year'],
        document_type=data['document_type'],
        document_series=data['document_series'],
        document_number=data['document_number'],
        document_issue_date=data['document_issue_date'],
        document_issuer=data['document_issuer']
    )
    db.session.add(employee)
    employee = EmployeeModel.query.filter_by(series=data['series'])
    print(employee.id)

    if 'job_information' in data:
        for job_info in data['job_information']:
            job = JobInformation(
                employee_id=employee.id,
                admission_date=job_info['admission_date'],
                dismissal_date=job_info['dismissal_date'],
                seal_decryption=job_info['seal_decryption'],
                position_decryption=job_info['position_decryption'],
                order_number=job_info['order_number']
            )
            db.session.add(job)

    if 'awards' in data:
        for award_info in data['awards']:
            award = Award(
                employee_id=employee.id,
                date=award_info['date'],
                seal_decryption=award_info['seal_decryption'],
                awards_information=award_info['awards_information'],
                order_number=award_info['order_number']
            )
            db.session.add(award)

    db.session.commit()

    return jsonify({'message': 'Data inserted successfully'}), 200


swaggerui_blueprint = get_swaggerui_blueprint(
    app.config['SWAGGER_URL'],
    app.config['API_URL'],
    config={
        'app_name': "SWAGGER"
    }
)


app.register_blueprint(swaggerui_blueprint, url_prefix=app.config['SWAGGER_URL'])


