import pandas as pd
import json

df = pd.read_csv('whole_logs_anomalies.csv')
msg_col = list(df['message'])
winlog_col = list(df['winlog'])

layer_entries = []
for count, rule in enumerate(msg_col):
    patt = rule.replace('\n', '|')
    patt1 = patt.split('|')
    for rulename in patt1:
        if 'RuleName:' in rulename:
            rule = rulename.replace('=', '|')
            rule = rule.replace(': ', '|')
            rule = rule.replace(',', '|')
            rule = rule.split('|')
            if 'technique_id' in rule:
                index = rule.index('technique_id') + 1
                technique = rule[index]
                layer_entry = {
                    "techniqueID": technique,
                    "color": "#FF5733",  # Set a color for the entry
                    "comment": winlog_col[count],
                }
                layer_entries.append(layer_entry)
            break

print(len(layer_entries))

layer_json = {
    "version": "4.4",
    "name": "Windows Log Mapping",
    "domain": "mitre-enterprise",  # Adjust based on your domain
    "description": "Mapping of Windows logs to MITRE ATT&CK techniques",
    "techniques": layer_entries,
}

with open("mitre_layer.json", "w") as layer_file:
    json.dump(layer_json, layer_file, indent=4)