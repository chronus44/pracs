
module.exports.createPage = function (myTitle, query){
    return `<!DOCTYPE html>
            <html>

            <head>
                <title>${myTitle}</title>
                <meta charset="UTF-8" />
            </head>

            <body>
                <h1>${myTitle}</h1>

                <div>
                    <h2>Your Last Query is: ${query}</h2>
                </div>

                <div>
                    <form method="POST" action="/result">
                        Search Your Query for Tweets Here: <input type="text" placeholder="Search Query" name="userQuery" required>
                        <input type="submit">
                    </form>
                </div>
                
                <script>
                </script>
            </body>
            </html>`
}

module.exports.createResultPage = function(query, data){
    return `<!DOCTYPE html>
    <html>

    <head>
    </head>

    <body>

        <div>
            <h2>The Query is: ${query}</h2>
        </div>

        <div>
        <form action="/">
            <button>Back</button>
        </form>

            ${data}
        </div>
        
        <script>
            function goBack(){
                window.history.back();
            }
        </script>
    </body>
    </html>`
}