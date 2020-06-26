package libs

// ChartjsDatasetsItem ...
type ChartjsDatasetsItem struct {
	Label   string `json:"label"`
	Data    []int  `json:"data"`
	BgColor string `json:"backgroundColor"`
}

// Chartjs ...
type Chartjs struct {
	Labels   []string              `json:"labels"`
	Datasets []ChartjsDatasetsItem `json:"datasets"`
}

// ChartjsColor ...
var ChartjsColor = map[string]string{
	"case":    "#000000",
	"death":   "#A50026",
	"recover": "#87ceeb",
	"active":  "#ff6347",
}
