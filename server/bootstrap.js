// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Meteor Principles",
       contents: [
         ["Data on the Wire", "Simplicity", "Better UX", "Fun"],
         ["One Language", "Simplicity", "Fun"],
         ["Database Everywhere", "Simplicity"],
         ["Latency Compensation", "Better UX"],
         ["Full Stack Reactivity", "Better UX", "Fun"],
         ["Embrace the Ecosystem", "Fun"],
         ["Simplicity Equals Productivity", "Simplicity", "Fun"]
       ]
      },
      {name: "Languages",
       contents: [
         ["Lisp", "GC"],
         ["C", "Linked"],
         ["C++", "Objects", "Linked"],
         ["Python", "GC", "Objects"],
         ["Ruby", "GC", "Objects"],
         ["JavaScript", "GC", "Objects"],
         ["Scala", "GC", "Objects"],
         ["Erlang", "GC"],
         ["6502 Assembly", "Linked"]
         ]
      },
      {name: "Favorite Scientists",
       contents: [
         ["Ada Lovelace", "Computer Science"],
         ["Grace Hopper", "Computer Science"],
         ["Marie Curie", "Physics", "Chemistry"],
         ["Carl Friedrich Gauss", "Math", "Physics"],
         ["Nikola Tesla", "Physics"],
         ["Claude Shannon", "Math", "Computer Science"]
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Lists.insert({name: data[i].name});
      for (var j = 0; j < data[i].contents.length; j++) {
        var info = data[i].contents[j];
        Todos.insert({list_id: list_id,
                      text: info[0],
                      timestamp: timestamp,
                      tags: info.slice(1)});
        timestamp += 1; // ensure unique timestamp.
      }
    }
  }
});

Meteor.startup(function () {
  if (Schools.find().count() === 0) {
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

    var data = [
      {name: "University of Arizona",
       courses: [
         {name: "Discrete Structures",
          department: "CSC",
          number: "245",
          subscribers: ["Storme","Roey","Chris"],
          tasks: [
            {content: "Read through the syllabus pdf.",
            completed_by: ["Storme"],
            muted_by: ["Chris"],
            timestamp: new Date().getTime(),
            comments: [{}],
            },
            {content: "Study for the midterm.",
            completed_by: ["Storme", "Chris"],
            muted_by: [],
            timestamp: new Date().getTime()+1,
            comments: [{}],
            },
            {content: "Study for the final exam.",
            completed_by: [],
            muted_by: ["Storme", "Chris", "Roey"],
            timestamp: new Date().getTime()+2,
            comments: [{}],
            }]
         },
         {name: "Web Programming",
          department: "CSC",
          number: "337",
          subscribers: ["Storme","Roey","Chris"],
          tasks: [
            {content: "Read through the Syllabus pdf.",
            completed_by: ["Roey"],
            muted_by: ["Storme", "Chris"],
            timestamp: new Date().getTime(),
            comments: [{}],
            },
            {content: "Study for the midterm.",
            completed_by: ["Roey", "Chris"],
            muted_by: ["Chris"],
            timestamp: new Date().getTime()+1,
            comments: [{}],
            },
            {content: "Study for the final exam.",
            completed_by: ["Chris"],
            muted_by: ["Storme", "Roey"],
            timestamp: new Date().getTime()+2,
            comments: [{}],
            }]
         }]
      }];

    for(var i = 0; i < users.length; i++)
        Users.insert(users[i]);

    for(var i = 0; i < data.length; i++)
        Schools.insert(data[i]);
  }
});
