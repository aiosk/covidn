package libs

import (
	"reflect"
)

// StructGetTag ...
func StructGetTag(structVal interface{}, tag string) map[string]string {
	val := reflect.ValueOf(structVal)
	t := val.Type()

	tags := make(map[string]string)
	for i := 0; i < t.NumField(); i++ {
		tags[t.Field(i).Name] = t.Field(i).Tag.Get(tag)
	}

	return tags
}
