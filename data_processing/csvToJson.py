import csv, json

fileNames = {"V1_Annual", "V1_Monthly", "V1_RecAnnual"}

for file in fileNames:
    csvFile = open("".join(["C:/Users/justi/OAMK_WebProject_2023/data/visualization1/",file,".csv"]),'r')
    jsonFile = open("".join(["C:/Users/justi/OAMK_WebProject_2023/data/",file,".json"]),'w')
    
    reader = csv.DictReader(csvFile)

    rows = {}

    for row in reader:
        new_row = {key: value for key, value in row.items() if (key != 'info' and value)}
        id = row['info']
        rows[id] = new_row
    
    json.dump(rows, jsonFile, indent=4)

    csvFile.close()
    jsonFile.close()

