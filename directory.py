import peewee
db = peewee.SqliteDatabase('maerli.db')
class Directory(peewee.Model):
    id=peewee.PrimaryKeyField()
    parentId=peewee.IntegerField()
    name=peewee.CharField()
    type=peewee.CharField()
    class Meta:
        database=db
    def maerli(field):
    	return eval(field)