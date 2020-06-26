module github.com/aiosk/covidn

go 1.14

replace github.com/aiosk/covidn/update => ./update

require (
	github.com/aiosk/covidn/libs v0.0.0-00010101000000-000000000000
	github.com/aiosk/covidn/prov v0.0.0-00010101000000-000000000000
	github.com/aiosk/covidn/provdetail v0.0.0-00010101000000-000000000000
	github.com/aiosk/covidn/rawan v0.0.0-00010101000000-000000000000
	github.com/aiosk/covidn/update v0.0.0-00010101000000-000000000000
	github.com/jordic/goics v0.0.0-20181215212140-feb996c8e01f // indirect
)

replace github.com/aiosk/covidn/libs => ./libs

replace github.com/aiosk/covidn/prov => ./prov

replace github.com/aiosk/covidn/provdetail => ./provdetail

replace github.com/aiosk/covidn/rawan => ./rawan
