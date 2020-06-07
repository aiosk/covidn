module github.com/aiosk/covid19Idn

go 1.14

replace github.com/aiosk/covid19Idn/update => ./update

require (
	github.com/aiosk/covid19Idn/libs v0.0.0-00010101000000-000000000000
	github.com/aiosk/covid19Idn/prov v0.0.0-00010101000000-000000000000
	github.com/aiosk/covid19Idn/provdetail v0.0.0-00010101000000-000000000000
	github.com/aiosk/covid19Idn/rawan v0.0.0-00010101000000-000000000000
	github.com/aiosk/covid19Idn/update v0.0.0-00010101000000-000000000000
	github.com/jordic/goics v0.0.0-20181215212140-feb996c8e01f // indirect
)

replace github.com/aiosk/covid19Idn/libs => ./libs

replace github.com/aiosk/covid19Idn/prov => ./prov

replace github.com/aiosk/covid19Idn/provdetail => ./provdetail

replace github.com/aiosk/covid19Idn/rawan => ./rawan
