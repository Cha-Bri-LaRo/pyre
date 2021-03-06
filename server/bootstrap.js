// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var users = [
      {name: "Roey",
      school: "University of Arizona"
      },
      {name: "Storme",
      school: "University of Arizona"
      },
      {name: "Chris",
      school: "University of Arizona"
      }];

    var user_ids = [];
    for(var i = 0; i < users.length; i++)
        user_ids.push(Users.insert(users[i]));

    var data = [
      {name: "Discrete Structures",
       number: "CSC 245",
       users: user_ids,
       contents: [
	 ["Read the syllabus", new Date('8/11/12')],
	 ["Complete Program #1", new Date('8/13/12')],
       ]
      },
      {name: "Linear Algebra",
       number: "MATH 215",
       users: [user_ids[1], user_ids[2]],
       contents: [
	 ["Read the syllabus", new Date('8/12/12')],
	 ["Complete Assignment #1", new Date('8/14/12')],
         ]
      },
      {name: "Literature",
       number: "ENGL 101",
       users: [user_ids[0], user_ids[2]],
       contents: [
	 ["Read the syllabus", new Date('8/15/12')],
	 ["Read a book", new Date('8/20/12')]
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Lists.insert({name: data[i].name, number: data[i].number, users: data[i].users});
      for (var j = 0; j < data[i].contents.length; j++) {
        var info = data[i].contents[j];
        Todos.insert({list_id: list_id,
                      text: info[0],
                      timestamp: timestamp,
                      tags: info.slice(1),
			due: info[1]});
        timestamp += 1; // ensure unique timestamp.
      }
    }
  }
});

Meteor.startup(function () {
/*
  if (Schools.find().count() === 0) {

    var data = [
      {name: "University of Arizona",
       courses: [
         {name: "Discrete Structures",
          department: "CSC",
          number: "245",
          subscribers: [user_ids[0],user_ids[1],user_ids[2]],
          tasks: [
            {content: "Read through the syllabus pdf.",
            completed_by: [user_ids[1]],
            muted_by: [user_ids[2]],
            timestamp: new Date().getTime(),
            comments: [{}],
            },
            {content: "Study for the midterm.",
            completed_by: [user_ids[1], user_ids[2]],
            muted_by: [],
            timestamp: new Date().getTime()+1,
            comments: [{}],
            },
            {content: "Study for the final exam.",
            completed_by: [],
            muted_by: [user_ids[1], user_ids[2], user_ids[0]],
            timestamp: new Date().getTime()+2,
            comments: [{}],
            }]
         },
         {name: "Web Programming",
          department: "CSC",
          number: "337",
          subscribers: [user_ids[1],user_ids[0],user_ids[2]],
          tasks: [
            {content: "Read through the Syllabus pdf.",
            completed_by: [user_ids[0]],
            muted_by: [user_ids[1], user_ids[2]],
            timestamp: new Date().getTime(),
            comments: [{}],
            },
            {content: "Study for the midterm.",
            completed_by: [user_ids[0], user_ids[2]],
            muted_by: [user_ids[2]],
            timestamp: new Date().getTime()+1,
            comments: [{}],
            },
            {content: "Study for the final exam.",
            completed_by: [user_ids[2]],
            muted_by: [user_ids[1], user_ids[0]],
            timestamp: new Date().getTime()+2,
            comments: [{}],
            }]
         }]
      }];

    for(var i = 0; i < data.length; i++)
        Schools.insert(data[i]);
  }
*/
});
