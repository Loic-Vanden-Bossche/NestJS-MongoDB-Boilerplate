<!-- Generator: Widdershins v4.0.1 -->

<h1 id="exemple-app">Exemple APP v0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

The exemple APP API description

Base URLs:

# Authentication

* API Key (cookie)
    - Parameter Name: **connect.sid**, in: cookie. 

<h1 id="exemple-app-default">Default</h1>

## AppController_getHello

<a id="opIdAppController_getHello"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /health

```

```http
GET /health HTTP/1.1

```

```javascript

fetch('/health',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/health',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/health')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/health', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/health");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/health", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /health`

<h3 id="appcontroller_gethello-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="exemple-app-users">Users</h1>

## UsersController_getUsers

<a id="opIdUsersController_getUsers"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /users

```

```http
GET /users HTTP/1.1

```

```javascript

fetch('/users',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/users',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/users')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users`

*[SuperAdmin] Get all users*

<h3 id="userscontroller_getusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_createUser

<a id="opIdUsersController_createUser"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /users \
  -H 'Content-Type: application/json'

```

```http
POST /users HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "email": "exemple.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "role": "super_admin",
  "password": "123456"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/users',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post '/users',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/users', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users`

*[SuperAdmin] Create new user*

> Body parameter

```json
{
  "email": "exemple.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "role": "super_admin",
  "password": "123456"
}
```

<h3 id="userscontroller_createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateUserDto](#schemacreateuserdto)|true|none|

<h3 id="userscontroller_createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_getUser

<a id="opIdUsersController_getUser"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /users/{id}

```

```http
GET /users/{id} HTTP/1.1

```

```javascript

fetch('/users/{id}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/users/{id}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/users/{id}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users/{id}`

*[SuperAdmin] Get specific user*

<h3 id="userscontroller_getuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="userscontroller_getuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_updateUser

<a id="opIdUsersController_updateUser"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT /users/{id} \
  -H 'Content-Type: application/json'

```

```http
PUT /users/{id} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "password": "123456"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/users/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.put '/users/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.put('/users/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/{id}`

*[SuperAdmin] Update specific user*

> Body parameter

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "password": "123456"
}
```

<h3 id="userscontroller_updateuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateUserDto](#schemaupdateuserdto)|true|none|

<h3 id="userscontroller_updateuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_deleteUser

<a id="opIdUsersController_deleteUser"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /users/{id}

```

```http
DELETE /users/{id} HTTP/1.1

```

```javascript

fetch('/users/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete '/users/{id}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('/users/{id}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /users/{id}`

*[SuperAdmin] Delete specific user*

<h3 id="userscontroller_deleteuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="userscontroller_deleteuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_updateMe

<a id="opIdUsersController_updateMe"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT /users/me \
  -H 'Content-Type: application/json'

```

```http
PUT /users/me HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "newPassword": "123456",
  "newPasswordConfirm": "123456"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/users/me',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.put '/users/me',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.put('/users/me', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','/users/me', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/users/me");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/users/me", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/me`

*[User] Update self*

> Body parameter

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "newPassword": "123456",
  "newPasswordConfirm": "123456"
}
```

<h3 id="userscontroller_updateme-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UpdateMeDto](#schemaupdatemedto)|true|none|

<h3 id="userscontroller_updateme-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="exemple-app-auth">Auth</h1>

## AuthController_login

<a id="opIdAuthController_login"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /auth/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /auth/login HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "exemple.test@gmail.com",
  "password": "123456"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/auth/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/auth/login',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/auth/login', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/auth/login', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/auth/login");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/auth/login", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /auth/login`

*[Public] Login using credentials*

> Body parameter

```json
{
  "email": "exemple.test@gmail.com",
  "password": "123456"
}
```

<h3 id="authcontroller_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginAuthDto](#schemaloginauthdto)|true|Login data|

> Example responses

> 200 Response

```json
{
  "id": "5e9f8f8f8f8f8f8f8f8f8f8f8",
  "email": "exemplle.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "role": "user"
}
```

<h3 id="authcontroller_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Login successful|[CurrentUser](#schemacurrentuser)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Login failed - Bad credentials|None|

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Set-Cookie|undefined||Authorization cookie|

<aside class="success">
This operation does not require authentication
</aside>

## AuthController_logout

<a id="opIdAuthController_logout"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /auth/logout

```

```http
GET /auth/logout HTTP/1.1

```

```javascript

fetch('/auth/logout',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/auth/logout',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/auth/logout')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/auth/logout', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/auth/logout");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/auth/logout", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /auth/logout`

*Reset current cookie*

<h3 id="authcontroller_logout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## AuthController_register

<a id="opIdAuthController_register"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /auth/register \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /auth/register HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "exemple.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "password": "123456",
  "passwordConfirm": "123456"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/auth/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/auth/register',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/auth/register', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/auth/register', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/auth/register");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/auth/register", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /auth/register`

*[Public] Register standalone/organization*

> Body parameter

```json
{
  "email": "exemple.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "password": "123456",
  "passwordConfirm": "123456"
}
```

<h3 id="authcontroller_register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RegisterAuthDto](#schemaregisterauthdto)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "5e9f8f8f8f8f8f8f8f8f8f8f8",
  "email": "exemplle.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "role": "user"
}
```

<h3 id="authcontroller_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Register successful|[CurrentUser](#schemacurrentuser)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Register failed - Email already exists|None|

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|201|Set-Cookie|undefined||Authorization cookie|

<aside class="success">
This operation does not require authentication
</aside>

## AuthController_regenerateTokens

<a id="opIdAuthController_regenerateTokens"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /auth/refresh-tokens

```

```http
GET /auth/refresh-tokens HTTP/1.1

```

```javascript

fetch('/auth/refresh-tokens',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/auth/refresh-tokens',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/auth/refresh-tokens')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/auth/refresh-tokens', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/auth/refresh-tokens");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/auth/refresh-tokens", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /auth/refresh-tokens`

*[User] Get a new jwt using refresh token*

<h3 id="authcontroller_regeneratetokens-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Refresh token successful|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Refresh token failed - Expired token or not logged in|None|

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Set-Cookie|undefined||Authorization cookie|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
cookie
</aside>

## AuthController_getProfile

<a id="opIdAuthController_getProfile"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /auth/me \
  -H 'Accept: application/json'

```

```http
GET /auth/me HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/auth/me',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/auth/me',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/auth/me', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/auth/me', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/auth/me");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/auth/me", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /auth/me`

*[User] Get the currently logged user*

> Example responses

> 200 Response

```json
{
  "id": "5e9f8f8f8f8f8f8f8f8f8f8f8",
  "email": "exemplle.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "role": "user"
}
```

<h3 id="authcontroller_getprofile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Current logged user|[CurrentUser](#schemacurrentuser)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Not logged in|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
cookie
</aside>

## AuthController_resetPassword

<a id="opIdAuthController_resetPassword"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /auth/reset-password \
  -H 'Content-Type: application/json'

```

```http
GET /auth/reset-password HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "email": "exemple.test@gmail.com"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/auth/reset-password',
{
  method: 'GET',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.get '/auth/reset-password',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.get('/auth/reset-password', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/auth/reset-password', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/auth/reset-password");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/auth/reset-password", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /auth/reset-password`

*Trigger reset-password procedure*

> Body parameter

```json
{
  "email": "exemple.test@gmail.com"
}
```

<h3 id="authcontroller_resetpassword-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ResetPasswordDto](#schemaresetpassworddto)|true|none|

<h3 id="authcontroller_resetpassword-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## AuthController_changePassword

<a id="opIdAuthController_changePassword"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /auth/change-password \
  -H 'Content-Type: application/json'

```

```http
POST /auth/change-password HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "email": "exemple.test@gmail.com",
  "token": "b7wCwIHaRkhhCJW5IfZN8LzehT1SoE98Y4ZfmrCE8X9gj14TrWqBBdbhXzjm2vzb",
  "newPassword": "12345612",
  "newPasswordConfirm": "123456"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/auth/change-password',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post '/auth/change-password',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/auth/change-password', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/auth/change-password', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/auth/change-password");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/auth/change-password", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /auth/change-password`

*Change the password using token*

> Body parameter

```json
{
  "email": "exemple.test@gmail.com",
  "token": "b7wCwIHaRkhhCJW5IfZN8LzehT1SoE98Y4ZfmrCE8X9gj14TrWqBBdbhXzjm2vzb",
  "newPassword": "12345612",
  "newPasswordConfirm": "123456"
}
```

<h3 id="authcontroller_changepassword-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ChangePasswordAuthDto](#schemachangepasswordauthdto)|true|none|

<h3 id="authcontroller_changepassword-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_CreateUserDto">CreateUserDto</h2>
<!-- backwards compatibility -->
<a id="schemacreateuserdto"></a>
<a id="schema_CreateUserDto"></a>
<a id="tocScreateuserdto"></a>
<a id="tocscreateuserdto"></a>

```json
{
  "email": "exemple.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "role": "super_admin",
  "password": "123456"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|User email|
|firstname|string|true|none|User first name|
|lastname|string|true|none|User last name|
|username|string|true|none|User nickname|
|role|object|true|none|User role|
|password|string|true|none|User password|

<h2 id="tocS_UpdateMeDto">UpdateMeDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatemedto"></a>
<a id="schema_UpdateMeDto"></a>
<a id="tocSupdatemedto"></a>
<a id="tocsupdatemedto"></a>

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "newPassword": "123456",
  "newPasswordConfirm": "123456"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|firstname|string|true|none|User first name|
|lastname|string|true|none|User last name|
|username|string|true|none|User nickname|
|newPassword|string|true|none|New user password|
|newPasswordConfirm|string|true|none|New user password confirmation|

<h2 id="tocS_UpdateUserDto">UpdateUserDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdateuserdto"></a>
<a id="schema_UpdateUserDto"></a>
<a id="tocSupdateuserdto"></a>
<a id="tocsupdateuserdto"></a>

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "password": "123456"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|firstname|string|true|none|User first name|
|lastname|string|true|none|User last name|
|username|string|true|none|User nickname|
|password|string|true|none|User password|

<h2 id="tocS_LoginAuthDto">LoginAuthDto</h2>
<!-- backwards compatibility -->
<a id="schemaloginauthdto"></a>
<a id="schema_LoginAuthDto"></a>
<a id="tocSloginauthdto"></a>
<a id="tocsloginauthdto"></a>

```json
{
  "email": "exemple.test@gmail.com",
  "password": "123456"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|User email|
|password|string|true|none|User password|

<h2 id="tocS_CurrentUser">CurrentUser</h2>
<!-- backwards compatibility -->
<a id="schemacurrentuser"></a>
<a id="schema_CurrentUser"></a>
<a id="tocScurrentuser"></a>
<a id="tocscurrentuser"></a>

```json
{
  "id": "5e9f8f8f8f8f8f8f8f8f8f8f8",
  "email": "exemplle.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "role": "user"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|The user's id|
|email|string|true|none|The user's email|
|firstname|string|true|none|The user's first name|
|lastname|string|true|none|The user's last name|
|username|string|true|none|The user's nickname|
|role|object|true|none|The user's role|

<h2 id="tocS_RegisterAuthDto">RegisterAuthDto</h2>
<!-- backwards compatibility -->
<a id="schemaregisterauthdto"></a>
<a id="schema_RegisterAuthDto"></a>
<a id="tocSregisterauthdto"></a>
<a id="tocsregisterauthdto"></a>

```json
{
  "email": "exemple.test@gmail.com",
  "firstname": "John",
  "lastname": "Doe",
  "username": "Johnny",
  "password": "123456",
  "passwordConfirm": "123456"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|User email|
|firstname|string|true|none|User first name|
|lastname|string|true|none|User last name|
|username|string|true|none|User nickname|
|password|string|true|none|User password|
|passwordConfirm|string|true|none|User password confirmation|

<h2 id="tocS_ResetPasswordDto">ResetPasswordDto</h2>
<!-- backwards compatibility -->
<a id="schemaresetpassworddto"></a>
<a id="schema_ResetPasswordDto"></a>
<a id="tocSresetpassworddto"></a>
<a id="tocsresetpassworddto"></a>

```json
{
  "email": "exemple.test@gmail.com"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|User email|

<h2 id="tocS_ChangePasswordAuthDto">ChangePasswordAuthDto</h2>
<!-- backwards compatibility -->
<a id="schemachangepasswordauthdto"></a>
<a id="schema_ChangePasswordAuthDto"></a>
<a id="tocSchangepasswordauthdto"></a>
<a id="tocschangepasswordauthdto"></a>

```json
{
  "email": "exemple.test@gmail.com",
  "token": "b7wCwIHaRkhhCJW5IfZN8LzehT1SoE98Y4ZfmrCE8X9gj14TrWqBBdbhXzjm2vzb",
  "newPassword": "12345612",
  "newPasswordConfirm": "123456"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|User email|
|token|string|true|none|Change password token|
|newPassword|string|true|none|New user password|
|newPasswordConfirm|string|true|none|New user password confirmation|

