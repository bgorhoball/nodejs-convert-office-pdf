# office-convert-pdf
A simple tool to convert word and excel to pdf

## Installation

### Method 1 - Use Docker Image
```
docker run -p 8080:8080 bgorhoball/office-convert
```


### Method 2 - Clone Project to Local 
```
npm install
```

#### Compiles and start local server
```
npm start
```

## Usage
Start server at http://localhost:8080/

### Example (sending request with axios)
```
const pdfInBase64String = await axios.post(
    'http://localhost:8080',
    `{
        "data": "${/*base64String*/}"
    }`,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);
```