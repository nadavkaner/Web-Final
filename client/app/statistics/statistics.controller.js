import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME)
    .controller('statistics', ($scope, Post) => {
      Post.group().$promise.then(data => {
        $scope.groups = data;
        createPopularUsersGraph(data, 'popular-genre-graph');
      });

      Post.author().$promise.then(data => {
        $scope.authors = data;
        createPopularUsersGraph(data, 'popular-author-graph');
      });

      function createPopularUsersGraph (data, id) {
        let width = 400,
          height = 400,
          radius = Math.min(width, height) / 2;

        const color = d3.scale.ordinal()
                .range(['#a05d56', '#6b486b', '#ff8c00', '#98abc5', '#8a89a6', '#d0743c', '#7b6888']);

        const arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

        const pie = d3.layout.pie()
                .sort(null)
                .value(d => {
                  return d.count;
                });

        const svg = d3.select(`#${id}`).append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2},${height / 2})`);

        data.forEach(d => {
          d.count = +d.count;
        });

        const g = svg.selectAll('.arc')
                .data(pie(data))
                .enter().append('g')
                .attr('class', 'arc');

        g.append('path')
                .attr('d', arc)
                .style('fill', d => {
                  return color(d.data._id);
                });

        g.append('text')
                .attr('transform', d => {
                  return `translate(${arc.centroid(d)})`;
                })
                .attr('dy', '.35em')
                .style('text-anchor', 'middle')
                .text(d => {
                  return d.data._id;
                });
      }
    });
