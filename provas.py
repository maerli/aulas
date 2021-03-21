import peewee
db = peewee.SqliteDatabase('maerli.db')
class Provas(peewee.Model):
	id=peewee.PrimaryKeyField()
	name=peewee.CharField()
	items=peewee.CharField()
	turma = peewee.CharField()
	disciplina = peewee.CharField()
	class Meta:
		database=db
