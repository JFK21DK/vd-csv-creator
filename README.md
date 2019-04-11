# Voter Declaration CSV Creator

Creates CSV files from a given set of voter declrations (VDs) (also as CSV) such that these can be imported at vaelgererklaering.dk site.

## Usage

Put the VDs as CSV files in the *csv* folder. Run the following command:

```bash
$ npm start -- --optin=2019-04-04
```

where the `--optin` option is used to filter VDs based on the given creation time.

You should get a similar result:

```
Read 10 lines (out of 93) from CSV file "...\vd-csv-creator\csv\cleaned_members_export_bd91baeb6f.csv".
Read 6 lines (out of 1204) from CSV file "...\vd-csv-creator\csv\unsubscribed_members_export_bd91baeb6f.csv".
Read 316 lines (out of 4485) from CSV file "...\vd-csv-creator\csv\subscribed_members_export_bd91baeb6f.csv".
Finished parsing 332 emails.
Creating CSV: ...\vd-csv-creator\out\out-332.csv
Done!
```

The resulting CSV files will be written to the *out* folder as seen in the output above.
