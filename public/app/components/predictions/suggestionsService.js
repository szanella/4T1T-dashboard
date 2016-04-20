(function() {
  angular.module('4T1T')
    .factory('Suggestions', suggestionsService);

    suggestionsService.$inject = ['$http'];
    function suggestionsService($http) {
      return {
        getPicks : function(picksAndBans) {
          var query = '?', i;
          if(picksAndBans) {
            if(picksAndBans.picks) {
              if(picksAndBans.picks.yours) {
                for(i=0; i < picksAndBans.picks.yours.length; i+=1) {
                  query += 'ypicks=' + encodeURIComponent(picksAndBans.picks.yours[i].hero) + '&';
                }
              }
              if(picksAndBans.picks.enemy) {
                for(i=0; i < picksAndBans.picks.enemy.length; i+=1) {
                  query += 'epicks=' + encodeURIComponent(picksAndBans.picks.enemy[i].hero) + '&';
                }
              }
            }
            if(picksAndBans.bans) {
              if(picksAndBans.bans.yours) {
                for(i=0; i < picksAndBans.bans.yours.length; i+=1) {
                  query += 'ybans=' + encodeURIComponent(picksAndBans.bans.yours[i].hero) + '&';
                }
              }
              if(picksAndBans.bans.enemy) {
                for(i=0; i < picksAndBans.bans.enemy.length; i+=1) {
                  query += 'ebans=' + encodeURIComponent(picksAndBans.bans.enemy[i].hero) + '&';
                }
              }
            }
          }

          query = query.slice(0, -1);
          return $http.get('/api/predictions/pick' + query);
        },
        getBans : function(picksAndBans) {
          var query = '?', i;
          if(picksAndBans) {
            if(picksAndBans.picks) {
              if(picksAndBans.picks.yours) {
                for(i=0; i < picksAndBans.picks.yours.length; i+=1) {
                  query += 'ypicks=' + encodeURIComponent(picksAndBans.picks.yours[i].hero) + '&';
                }
              }
              if(picksAndBans.picks.enemy) {
                for(i=0; i < picksAndBans.picks.enemy.length; i+=1) {
                  query += 'epicks=' + encodeURIComponent(picksAndBans.picks.enemy[i].hero) + '&';
                }
              }
            }
            if(picksAndBans.bans) {
              if(picksAndBans.bans.yours) {
                for(i=0; i < picksAndBans.bans.yours.length; i+=1) {
                  query += 'ybans=' + encodeURIComponent(picksAndBans.bans.yours[i].hero) + '&';
                }
              }
              if(picksAndBans.bans.enemy) {
                for(i=0; i < picksAndBans.bans.enemy.length; i+=1) {
                  query += 'ebans=' + encodeURIComponent(picksAndBans.bans.enemy[i].hero) + '&';
                }
              }
            }
          }

          query = query.slice(0, -1);
          return $http.get('/api/predictions/ban' + query);
        }
      };
    };
})();
