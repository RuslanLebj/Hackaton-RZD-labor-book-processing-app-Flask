from routes import celery
from models import db, EmployeeModel, JobInformation, Award
import json


@celery.task(bind=True)
def process_file_task(self, file_data):
    data = analyze_image(file_data)  # Ваша

    try:
      employee = EmployeeModel(**data['title'])
      db.session.add(employee)
      db.session.commit()

      return {'status': 'Task completed!', 'result': data}
    except Exception as e:
        self.update_state(state='FAILURE', meta={'exc': str(e)})
        raise

def analyze_image(image_data):
    # Ваш код для анализа изображения
    # Пример возвращаемого JSON:
    return {
  "awards": [
    {
      "awards_information": "danil krasava",
      "date": "2222222",
      "employee_id": 1,
      "id": 1,
      "order_number": "2222222222",
      "seal_decryption": "enviro"
    },
    {
      "awards_information": "danil krasava22222222222",
      "date": "2222222",
      "employee_id": 1,
      "id": 2,
      "order_number": "2222222222",
      "seal_decryption": "enviro"
    }
  ],
  "birth_year": "2023",
  "document_issue_date": null,
  "document_issuer": null,
  "document_number": "080808",
  "document_series": "7502",
  "document_type": null,
  "id": 1,
  "jobs": [
    {
      "admission_date": "2006",
      "dismissal_date": "2007",
      "employee_id": 1,
      "id": 1,
      "order_number": "123",
      "position_decryption": "programist",
      "seal_decryption": "enviro"
    },
    {
      "admission_date": "20088888886",
      "dismissal_date": "2888888007",
      "employee_id": 1,
      "id": 2,
      "order_number": "188823",
      "position_decryption": "program888888ist",
      "seal_decryption": "enviro88888"
    },
    {
      "admission_date": "20088888886",
      "dismissal_date": "2888888007",
      "employee_id": 1,
      "id": 3,
      "order_number": "188823",
      "position_decryption": "program888888ist",
      "seal_decryption": "enviro88888"
    }
  ],
  "name": "Pur",
  "number": "123123",
  "patronymic": "Purovich",
  "series": "SI-I",
  "surname": "Purov"
}
