import requests
from provas import Provas
from items import Items
#Items.create_table()

#req = requests.post('http://localhost:5000/api/add/items',json={ "head":"maerli", "options":"hiii","correct":"a"})
#Provas.create_table()
#Provas.create(name="matamatica", items="[1,2,3,4]")

req = requests.get('http://localhost:5000/api/get/items')
print(req.content)
