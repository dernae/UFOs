// import the data from data.js
const tableData = data;

//point our data to the HTML page - tell JS what type of element the data will be displayed in (table)
// tbody - table 
// Reference the HTML table using d3 to look for <tbody> tags in the HTML
var tbody = d3.select("tbody");

//create a function to start building a table 
// pass data as an argument to start working with it 
function buildTable(data) {
    //Clear table to avoid duplications 
    //tbody.html("");—tells JavaScript to use an empty string when creating the table; in other words, create a blank canvas. - standard clearing method 
    tbody.html("");
    //forEach function loops through our data array, and then adds rows of data to the table.
    //using an arrow function here because it's a cleaner way to write a forEach loop.
    // argumement dataRow represent each row of the data as we iterate through the array.
    data.forEach((dataRow) => {
        //create a variable that will append a row to the table body 
        // find the <tbody> tag within the HTML and add a table row ("tr"). tr= rows of the table
        // let instead of var to declare the row variable because variable is limited to just this block of code 
        let row = tbody.append("tr");
    
        //add code to loop through each field in the dataRow argument.
        //forEach((val) to specify that we want one object per row.
        //we're telling our code put each sighting onto its own row of data.
        Object.values(dataRow).forEach((val) => {
            //create a variable to append data to a table ata tag (<td>)
            let cell = row.append("td");
            //add the values from the object 
            cell.text(val);
        }
        );
      });
    }
//use D3 to handle an action from a user, such as a button click. Add an actual button to our HTML page to filter the table. 
//select the very first element that matches our selector string: "#datetime". - telling D3 to look for the #datetime id in the HTML tags.
function handleClick() {
     Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });
    // Grab the datetime value from the filter
    //#datetime is an id
    //let date = d3.select("#datetime").property("value");
    //let filteredData = tableData;
    //If there is a date already set, then use that date 
    //as a filter. If not, then return the default data.
     // Check to see if a date was entered and filter the
    // data using that date.
   // if (date) {
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      //filteredData = filteredData.filter(row => row.datetime === date);
    }
  
     // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
  }
  //assign a unique id to a button element in the HTML called "filter-btn"
  //we're telling D3 to execute our handleClick() function when the button with an id of filter-btn is clicked.
  // Attach an event to listen for the form button
  d3.selectAll("#filter-btn").on("click", handleClick);
  
  // Build the table when the page loads
  buildTable(tableData);
