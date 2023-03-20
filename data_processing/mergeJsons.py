import json

jsonFiles = {"V1_Annual", "V1_Monthly", "V1_RecAnnual", "V2_Cores", "V2_MaunaLoa",
             "V3_CO2_temperature", "V4_National_CO2_emissions", "V5_Sectors", 
             "V5_Subsectors_Agriculture", "V5_Subsectors_Energy", "V5_Subsectors_Industrial",
             "V5_Subsectors_Waste"}

masterDict = []

for file in sorted(jsonFiles):
        with open("".join([file,".json"]), 'r') as f:
                add = json.load(f)
                masterDict.append({file: add})


with open('data.json', 'w') as f:
    json.dump(masterDict, f, indent=4)
