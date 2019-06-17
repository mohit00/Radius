import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {

  constructor() { }
  radius: any = 10;
  ngOnInit() {
  }
// tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {



    
    const data = [{
      name: 'Mohit',
      value : 4
    }, {
      name: 'nait',
      value : 8
    }, {
      name: 'da',
      value : 15
    }, {
      name: 'ffs',
      value : 16
    }, {
      name: 'gda',
      value : 23
    }
    , {
      name: 'nxcv',
      value : 42
    }
   ];
// tslint:disable-next-line: one-variable-per-declaration
    const margin = {top: 20, right: 30, bottom: 30, left: 40},
width = 500 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;
    const x = d3.scaleBand().rangeRound([0, width])
        .padding(0.1);
    const y = d3.scaleLinear()
        .range([height, 0]);
    x.domain(data.map((d) => d.name));
    y.domain([0, d3.max(data,  (d) => d.value)]);
    const chart = d3.select('.chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom )
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);
    chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis);
    chart.selectAll('.bar')
.data(data)
.enter().append('rect')
.attr('class', 'bar')
.attr('x',  (d) => x(d.name))
.attr('y',  (d)  => y(d.value))
.attr('height',  (d)  => height - y(d.value))
.attr('width', x.bandwidth());
    }
    clicked(event: any) {

d3.select(event.target).append('circle').attr(
  'cx', event.x
).attr('cy', event.y).attr('r', this.radius).attr('fill', 'red');

d3.selectAll('circle').transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attr('r', function(d) { return Math.sqrt(22 * 22); });
    }
}
