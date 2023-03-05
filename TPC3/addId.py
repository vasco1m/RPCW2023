import json
  
# Opening JSON file
f = open('datasets/dataset-extra1.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
for index, p in enumerate(data["pessoas"]):
    p["id"] = "p" + str(index)
  
with open("datasets/dataset-extra1.json", "w") as outfile:
    json.dump(data, outfile)

# Closing file
f.close()