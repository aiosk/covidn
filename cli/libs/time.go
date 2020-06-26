package libs

import "time"

// UnixToMyFormat ...
func UnixToMyFormat(data int64) string {
	return time.Unix(data/1000, 0).Format("2006-01-02")
}

// UnixToMyShortFormat ...
func UnixToMyShortFormat(data int64) string {
	return time.Unix(data/1000, 0).Format("Jan 02")
}
