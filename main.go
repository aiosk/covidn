package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/aiosk/covid19Idn/libs"
	"github.com/aiosk/covid19Idn/prov"
	"github.com/aiosk/covid19Idn/provdetail"
	"github.com/aiosk/covid19Idn/rawan"
	"github.com/aiosk/covid19Idn/update"
)

func printHelp() {
	fmt.Println("expected subcommands")
	fmt.Println()
	fmt.Println("- update")
	fmt.Println("- prov")
	fmt.Println("- provdetail")
	fmt.Println("- rawan")
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

	switch os.Args[1] {
	case "update":
		cmdUpdate.Parse(os.Args[2:])
		srcFile := libs.OpenStdinOrFile(cmdUpdate)
		update.Main(srcFile, *cmdUpdateIcs)
	case "prov":
		cmdProv.Parse(os.Args[2:])
		srcFile := libs.OpenStdinOrFile(cmdProv)
		prov.Parse(srcFile)
	case "provdetail":
		cmdProvDetail.Parse(os.Args[2:])
		srcFile := libs.OpenStdinOrFile(cmdProvDetail)
		provdetail.Main(srcFile, *cmdProvDetailIcs)
	case "rawan":
		cmdRawan.Parse(os.Args[2:])
		srcFile := libs.OpenStdinOrFile(cmdRawan)
		rawan.ToCsv(srcFile)
	default:
		printHelp()
		os.Exit(1)
	}
}
