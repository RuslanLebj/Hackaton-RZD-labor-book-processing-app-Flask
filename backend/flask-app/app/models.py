from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class EmployeeModel(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)
    series = db.Column(db.String(10))
    number = db.Column(db.String(10))
    surname = db.Column(db.String(100))
    name = db.Column(db.String(100))
    patronymic = db.Column(db.String(100))
    birth_year = db.Column(db.String(10))
    document_type = db.Column(db.String(10))
    document_series = db.Column(db.String(10))
    document_number = db.Column(db.String(10))
    document_issue_date = db.Column(db.String(20))
    document_issuer = db.Column(db.String(200))

    jobs = db.relationship('JobInformation', backref='employee', lazy=True)
    awards = db.relationship('Award', backref='employee', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'series': self.series,
            'number': self.number,
            'surname': self.surname,
            'name': self.name,
            'patronymic': self.patronymic,
            'birth_year': self.birth_year,
            'document_type': self.document_type,
            'document_series': self.document_series,
            'document_number': self.document_number,
            'document_issue_date': self.document_issue_date,
            'document_issuer': self.document_issuer,
            'jobs': [job.to_dict() for job in self.jobs],
            'awards': [award.to_dict() for award in self.awards]
        }


class JobInformation(db.Model):
    __tablename__ = 'job_information'
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    admission_date = db.Column(db.String(20))
    dismissal_date = db.Column(db.String(20))
    seal_decryption = db.Column(db.String(200))
    position_decryption = db.Column(db.String(200))
    order_number = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'admission_date': self.admission_date,
            'dismissal_date': self.dismissal_date,
            'seal_decryption': self.seal_decryption,
            'position_decryption': self.position_decryption,
            'order_number': self.order_number
        }


class Award(db.Model):
    __tablename__ = 'awards'
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    date = db.Column(db.String(20))
    seal_decryption = db.Column(db.String(200))
    awards_information = db.Column(db.String(200))
    order_number = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'date': self.date,
            'seal_decryption': self.seal_decryption,
            'awards_information': self.awards_information,
            'order_number': self.order_number
        }
