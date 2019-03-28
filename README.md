# Voter Declaration CSV Creator

Creates CSV files from a given set of voter declrations (VDs) (also as CSV) such that these can be imported at vaelgererklaering.dk site.

## Usage

Put the VDs as CSV files in the *csv* folder. Run the *index.js* file:

```bash
$ node src/index.js
```

You should get a similar result:

```
CSV file has 80 lines
CSV file has 3991 lines
CSV file has 1095 lines
Finished parsing 5145 emails.
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-500.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-1000.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-1500.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-2000.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-2500.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-3000.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-3500.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-4000.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-4500.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-5000.csv
Creating CSV: /Users/foo/bar/vd-csv-creator/out/out-5145.csv
Done!
```

The resulting CSV files will be written to the *out* folder as seen in the output above.
