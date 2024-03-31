# Описание методов API

## Оглавление
* [Описание методов API](#описание-методов-api)
  * [Оглавление](#оглавление)
  * [Домен](#домен)
  * [Структуры данных](#структуры-данных)
* [Метод login](#метод-login)
* [Метод logout](#метод-logout)
* [Метод signUp](#метод-signUp)
* [Метод getMessages](#метод-getMessages)
* [Метод sendMessage](#метод-sendMessage)
* [Метод getScene](#метод-getScene)
* [Метод move ](#метод-move)


## Домен
```http://studfront```

## Структуры данных
### Корректный ответ Correct
```
{
    result: 'ok',
    data: Data
}
```
### Ответ с ошибкой Error
```
{
    result: 'error',
    error: ErrorDetail
}
```
### ErrorDetail
```
{
    code: number,
    text: string
}
```
### User
```
{
    id: string,
    name: string,
    token: string
}
```



### Метод login
### адрес
```/?method=login```
### параметры
|Параметр|Тип данных|Комментарий|
|-|-|-|
|login|string|логин юзера|
|hash|string|md5(md5(login+password)+rnd)|
|rnd|number|случайное целое число|

### Успешный ответ
```
Correct => User
```
### Ошибки
```
ErrorDetail = { code: 1001, text: 'Недостаточно параметров' } если переданы не все параметры
ErrorDetail = { code: 456, text: 'Неверный логин или пароль' } ошибка авторизации
```

### Метод logout
### адрес
```/?method=logout```
### параметры
|Параметр|Тип данных|Комментарий|
|-|-|-|
|token|string|авторизационный токен юзера|

### Успешный ответ
```
Correct => true
```
### Ошибки
```
ErrorDetail = { code: 400, text: 'Токен не найден' } если токен не передан
```


### Метод signUp
### адрес
```/?method=signUp```
### параметры
|Параметр|Тип данных|Комментарий|
|-|-|-|
|login |string|логин пользователя|
|nickname|string|никнейм пользователя|
|hash |string| md5(md5(login+password)+rnd)|
|verifyHash |string| подтверждение hash|

### Успешный ответ
```
Correct => { "name" : "nickname" }
```
### Ошибки
```
ErrorDetail = { code: 1501, text: 'Введите пароль и подтверждение пароля' } если не введены данные в строках пароль и подтверждение пароля
ErrorDetail = { code: 1001, text: 'Недостаточно параметров' } если недостаёт параметров
```
## Метод getMessages
### адрес
```/?method=getMessages```
### параметры
|Параметр|Тип данных|Комментарий|
|-|-|-|
|token |string |Аутентификационный токен |
|hash |string |md5(md5(login+password)+rnd) |
### Успешный ответ
```
Correct => true; {'messages' ; 'hash'} 
```
### Ошибки
```
ErrorDetail = { code: 455, text: 'Пользователь не авторизован' } если пользователь не авторизовался
ErrorDetail = { code: 1001, text: 'Недостаточно параметров' } если недостаёт параметров
```
## Метод sendMessage
### адрес
```/?method=sendMessage```
### параметры
|Параметр|Тип данных|Комментарий|
|-|-|-|
|token |string |Аутентификационный токен |
|message |string |текст сообщения |

### Успешный ответ
```
Correct => true
```
### Ошибки
```
ErrorDetail = { code: 455, text: 'Пользователь не авторизован' } если пользователь не авторизовался
ErrorDetail = { code: 1001, text: 'Недостаточно параметров' } если недостаёт параметров

```
## Метод getScene
### адрес
```/?method=getScene```
### параметры
|Параметр|Тип данных|Комментарий|
|-|-|-|
|token |string |Аутентификационный токен |
|hash |string |md5(md5(login+password)+rnd) |

### Успешный ответ
```
Correct => {'gamers'; 'items'; 'mobs'; 'map'}
```
### Ошибки
```
ErrorDetail = { code: 9000, text: 'Неопределенная ошибка'} ошибка не определена.
```
## 7.Метод move
### адрес
```/?method=move```
### параметры
|Параметр|Тип данных|Комментарий|
|-|-|-|
|token |string |Аутентификационный токен |
|direction |string |направление движения |
|x |string |координаты на плоскости |
|y |string |координаты на плоскости |

### Успешный ответ
```
Correct => true
```
### Ошибки
```
ErrorDetail = { code: 9000, text: 'Неопределенная ошибка' } ошибка не определена

```



