d3.csv('./Silicon-Valley-Diversity-Data-master/companyDetailed.csv', function(error, datum){
    if(error) {
        console.error('Error loading companyDetailed.csv dataset.');
        console.error(error);
        return;
    }

    var svg = d3.select('svg');

	var compName = "Facebook";
	
    var comp = svg.selectAll('.comp')
        .data(datum)
        .enter()
        .append('g')        
        .attr('transform', function(d, i){
			if (d.count == "na")
				d.count = 0;
			return 'translate('+scaleNum(d['count'])+ ',' + (340 - i/15) + ')';
			
        });
        // .attr('class','player')        

    comp.append('circle')
        .attr('r', 2);

     comp.append('text')
        .attr('dy', '+0.7em')
        .text(function(d){
			if (d['count'] > 40000)
				return d['company'];
        });

    // d3.select('svg')
    //     .selectAll('g')
    //     .data(datum)
    //     .enter()
    //     .append('g')
    //     .attr('transform', function(d) { 
    //         return "translate(" 
    //                 + scaleYear(d['year'])                     
    //                 + "," 
    //                 + scaleHomeruns(d['homeruns']) 
    //                 + ")"}
    //         )
    //     .append('circle')
    //     .attr('r', '2')
    //     .attr('data-rank', function(d) {
    //         if ( d['rank'] < 4 ) {
    //             return "high";
    //         }
    //         else {
    //             return "low";
    //         }  
    //     })
        
    // d3.selectAll('g > circle').each(function(d) {
    //     var name = d['name'];
    //     var t = document.createElement('text');
    //     t.textContent = name;
    //     this.parentNode.insertBefore(t, this.nextSibling);
    // });
});

// **** Functions to call for scaled values ****

function scaleNum(num) {
    return numScale(num);
}



// **** Code for creating scales, axes and labels ****

var numScale = d3.scaleLinear()
    .domain([0,80000]).range([80,720]);

var hrScale = d3.scaleLinear()
    .domain([0,4500]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(numScale).tickFormat(function(d){return d;}));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .text('Employees in Category');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(75,0)')
    .call(d3.axisLeft(hrScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,200) rotate(90)')
    .text('Companies Ordered');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(360,30)')
    .text('Test Scatter Plot of the Diversity Data');