package libs

import (
	"time"
)

// MyDateInt ...
type MyDateInt int64

// String ...
func (val MyDateInt) String() string {
	return UnixToMyFormat(val.Int64())
}

// MarshalCSV ...
func (val MyDateInt) MarshalCSV() ([]byte, error) {
	b := []byte(val.String())
	return b, nil
}

// Int64 ...
func (val MyDateInt) Int64() int64 {
	return int64(val)
}

// UnixToMyFormat ...
func UnixToMyFormat(data int64) string {
	return time.Unix(data/1000, 0).Format("2006-01-02")
}

// UnixToMyShortFormat ...
func UnixToMyShortFormat(data int64) string {
	return time.Unix(data/1000, 0).Format("Jan 02")
}
