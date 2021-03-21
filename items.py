import peewee
db = peewee.SqliteDatabase('maerli.db')
class Items(peewee.Model):
    id=peewee.PrimaryKeyField()
    parentId=peewee.IntegerField()
    head=peewee.CharField()
    options=peewee.CharField()
    correct=peewee.CharField()
    class Meta:
        database=db