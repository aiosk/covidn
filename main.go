package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/aiosk/covidn/libs"
	"github.com/aiosk/covidn/prov"
	"github.com/aiosk/covidn/provdetail"
	"github.com/aiosk/covidn/rawan"
	"github.com/aiosk/covidn/update"
)

func printHelp() {
	fmt.Println(`Usage :
- update
	- CSV
		curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s%3N)" |
		./covidn update - > dist/update.csv
	- ICS / ICalendar
		curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s%3N)" |
		./covidn update -ics - > dist/update.ics
- prov
	- CSV
		curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s%3N)" | ./covidn prov - |
		parallel -k "curl --compressed 'https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s%3N)'; echo" |
		paste -sd',' | sed 's/.*/[&]/' | ./covidn provdetail - > dist/prov.csv
	- ICS / ICalendar
		curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s%3N)" | ./covidn prov - |
		parallel -k "curl --compressed 'https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s%3N)'; echo" |
		paste -sd',' | sed 's/.*/[&]/' | ./covidn provdetail -ics - > dist/prov.ics
- rawan
	curl --compressed "https://api-rdt-v2.bersatulawancovid.id/dev/location/all_rawan?_=$(date +%s%3N)" |
	./covidn rawan - > dist/rawan.csv

see https://github.com/aiosk/covidn/blob/master/README.md`)
}

func main() {
	cmdUpdate := flag.NewFlagSet("update", flag.ExitOnError)
	cmdUpdateIcs := cmdUpdate.Bool("ics", false, "output to ics")
	cmdProv := flag.NewFlagSet("prov", flag.ExitOnError)
	cmdProvDetail := flag.NewFlagSet("provdetail", flag.ExitOnError)
	cmdProvDetailIcs := cmdProvDetail.Bool("ics", false, "output to ics")
	cmdRawan := flag.NewFlagSet("rawan", flag.ExitOnError)

	if len(os.Args) < 2 {
		printHelp()
		os.Exit(1)
	}
	var srcFile *os.File
	switch os.Args[1] {
	case "update":
		cmdUpdate.Parse(os.Args[2:])
		srcFile = libs.OpenStdinOrFile(cmdUpdate)
		update.Main(srcFile, *cmdUpdateIcs)
	case "prov":
		cmdProv.Parse(os.Args[2:])
		srcFile = libs.OpenStdinOrFile(cmdProv)
		prov.Parse(srcFile)
	case "provdetail":
		cmdProvDetail.Parse(os.Args[2:])
		srcFile = libs.OpenStdinOrFile(cmdProvDetail)
		provdetail.Main(srcFile, *cmdProvDetailIcs)
	case "rawan":
		cmdRawan.Parse(os.Args[2:])
		srcFile = libs.OpenStdinOrFile(cmdRawan)
		rawan.ToCsv(srcFile)
	default:
		printHelp()
		os.Exit(1)
	}

	defer srcFile.Close()
}
