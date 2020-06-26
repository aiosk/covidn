package libs

import (
	"math"

	"github.com/sajari/regression"
)

// ChartjsDatasetsItem ...
type ChartjsDatasetsItem struct {
	Label           string    `json:"label"`
	Data            []float64 `json:"data"`
	BackgroundColor string    `json:"backgroundColor,omitempty"`
	BorderColor     string    `json:"borderColor,omitempty"`
	Type            string    `json:"type,omitempty"`
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

// MyRegression ...
func MyRegression(data []float64) []float64 {
	var newData []float64

	r := new(regression.Regression)
	r.SetObserved("case")
	r.SetVar(0, "x")
	r.SetVar(1, "x^2")
	r.SetVar(2, "x^3")

	for i, v2 := range data {
		x := float64(i + 1)
		r.Train(regression.DataPoint(v2, []float64{x, math.Pow(x, 2), math.Pow(x, 3)}))
	}
	r.Run()

	for i := range data {
		x := float64(i + 1)
		itemRegression := r.Coeff(0) + r.Coeff(1)*x + r.Coeff(2)*math.Pow(x, 2) + r.Coeff(3)*math.Pow(x, 3)

		newData = append(newData, itemRegression)
	}

	return newData
}
