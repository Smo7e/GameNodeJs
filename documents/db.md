# Структура Данных

**Таблицы**
1. [game](#game)
2. [gamers](#gamers)
3. [gamers_items](#gamersitems)
4. [gamers_properties](#gamersproperties)
5. [invitations](#invitations)
6. [items](#items)
7. [messages](#messages)
8. [mobs](#mobs)
9. [persons](#persons)
10. [questions_programmer](#questionsprogrammer)
11. [questions_russian](#questionsrussian)
12. [rangs](#rangs)
13. [room](#room)
14. [room_exits](#roomexits)
15. [statistics](#statistics)
18. [users](#users)


## game
|№|Имя|Тип|Сравнение|Null|По умолчанию|Дополнительно|
|:-:|-|-|:-:|-|-|:-:|
|1|id|int|-|Нет|Нет|AUTO_INCREMENT|
|2|version|varchar(256)|utf8mb3_general_ci|Нет|Нет|-|
|3|chat_hash|varchar(256)|utf8mb3_general_ci|Нет|Нет|-|
|4|gamers_hash|varchar(256)|utf8mb3_general_ci|Нет|Нет|-|
|5|items_hash|varchar(256)|utf8mb3_general_ci|Нет|NULL|-|
|6|mobs_hash|varchar(256)|utf8mb3_general_ci|Нет|NULL|-| 
|7|update_timestamp|int|-|Нет|0|-|
|8|update_timeout|int|-|Нет|300|-|

## gamers
|№|Имя|Тип|Сравнение|Null|По умолчанию|Дополнительно|
|:-:|-|-|:-:|-|-|:-:|
|1|id|int|-|Нет|Нет|AUTO_INCREMENT|
|2|user_id|int|-|Нет|Нет|-|
|3|person_id|int|-|Нет|Нет|-|
|4|status|varchar(256)|utf8mb3_general_ci|Нет|Нет|-|
|5|x|float|-|Нет|0|-|
|6|y|float|-|Нет|0|-| 
|7|direction|varchar(256)|utf8mb3_general_ci|Нет|down|-|
|8|hp|int|-|Нет|100|-|

## gamers_items
|№|Имя|Тип|Сравнение|Null|По умолчанию|Дополнительно|
|:-:|-|-|:-:|-|-|:-:|
|1|id|bigint|-|Нет|Нет|AUTO_INCREMENT|
|2|item_id|bigint|-|Да|NULL|-|
|3|gamer_id|bigint|-|Да|NULL|-|
|4|status|varchar(20)|utf8mb4_unicode_ci|Да|NULL|-|
|5|x|float|-|Да|NULL|-|
|6|y|float|-|Да|NULL|-| 

## gamers_properties
|№|Имя|Тип|Сравнение|Null|По умолчанию|Дополнительно|
|:-:|-|-|:-:|-|-|:-:|
|1|id|bigint|-|Нет|Нет|AUTO_INCREMENT|
|2|gamer_id|bigint|-|Да|NULL|-|
|3|key|varchar(255)|utf8mb4_unicode_ci|Да|NULL|-|
|4|name|varchar(255)|utf8mb4_unicode_ci|Да|NULL|-|
|5|value|varchar(255)|utf8mb4_unicode_ci|Да|NULL|-|

## invitations
|№|Имя|Тип|Null|По умолчанию|Дополнительно|
|:-:|-|-|-|-|:-:|
|1|id|int|Нет|Нет|AUTO_INCREMENT|
|2|id_who|int|Нет|Нет|-|
|3|id_to_whom|int|Нет|Нет|-|

## items
|№|Имя|Тип|Сравнение|Null|По умолчанию|
|:-:|-|-|:-:|-|-|
|1|id|bigint|-|Нет|Нет|
|2|name|varchar(50)|utf8mb4_unicode_ci|Нет|Нет|
|3|type|varchar(50)|utf8mb4_unicode_ci|Нет|Нет|
|4|location|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|5|image|varchar(100)|utf8mb4_unicode_ci|Нет|Нет|
|6|description|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|

## messages
|№|Имя|Тип|Сравнение|Null|По умолчанию|
|:-:|-|-|:-:|-|-|
|1|id|int|-|Нет|Нет|
|2|user_id|int|-|Нет|Нет|
|3|message|varchar(256)|utf8mb3_general_ci|Нет|Нет|
|4|created|datetime|-|Нет|Нет|

## mobs
|№|Имя|Тип|Сравнение|Null|По умолчанию|
|:-:|-|-|:-:|-|-|
|1|id|int|-|Нет|Нет|
|2|x|float|-|Нет|0|
|3|y|float|-|Нет|0|
|4|status|varchar(256)|utf8mb4_unicode_ci|Нет|Нет|
|5|hp|int|-|Нет|120|

## persons
|№|Имя|Тип|Сравнение|Null|По умолчанию|
|:-:|-|-|:-:|-|-|
|1|id|bigint|-|Нет|Нет|
|2|hp|float|-|Да|NULL|
|3|name|varchar(20)|utf8mb4_unicode_ci|Да|NULL|
|4|image|varchar(255)|utf8mb4_unicode_ci|Да|NULL|

## questions_programmer
|№|Имя|Тип|Сравнение|Null|По умолчанию|
|:-:|-|-|:-:|-|-|
|1|id|int|-|Нет|Нет|
|2|question|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|3|answer_1|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|4|answer_2|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|5|answer_3|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|6|answer_4|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|7|correct_answer|int|-|Нет|Нет|

## questions_russian
|№|Имя|Тип|Сравнение|Null|По умолчанию|
|:-:|-|-|:-:|-|-|
|1|id|int|-|Нет|Нет|
|2|question|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|3|answer_1|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|4|answer_2|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|5|answer_3|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|6|answer_4|varchar(255)|utf8mb4_unicode_ci|Нет|Нет|
|7|correct_answer|int|-|Нет|Нет|

## rangs
|№|Имя|Тип|Сравнение|Null|По умолчанию|
|:-:|-|-|:-:|-|-|
|1|id|bigint|-|Нет|Нет|
|2|name|varchar(120)|utf8mb4_unicode_ci|Да|NULL|
|3|experience|float|-|Да|NULL|

## room
|№|Имя|Тип|Null|По умолчанию|
|:-:|-|-|-|-|
|1|id|bigint|Нет|Нет|
|2|width|int|Да|NULL|
|3|height|int|Да|NULL|

## room_exits
|№|Имя|Тип|Сравнение|Null|По умолчанию|
|:-:|-|-|:-:|-|-|
|1|id|bigint|-|Нет|Нет|
|2|room_id|bigint|-|Да|NULL|
|3|position|varchar(255)|utf8mb4_unicode_ci|Да|NULL|
|4|goto_id|bigint|-|Да|NULL|
|5|status|varchar(20)|utf8mb4_unicode_ci|Да|NULL|

## statistics
|№|Имя|Тип|Null|По умолчанию|
|:-:|-|-|-|-|
|1|id|bigint|Нет|Нет|
|2|user_id|int|Нет|Нет|
|3|kills|int|Да|NULL|
|4|death|int|Да|NULL|
|5|experience|int|Да|NULL|
|6|damage|int|Да|NULL|

## users
|№|Имя|Тип|Сравнение|Null|По умолчанию|Дополнительно|
|:-:|-|-|:-:|-|-|:-:|
|1|id|bigint(20)|-|Нет|Нет|AUTO_INCREMENT|
|2|login|varchar(256)|utf8mb3_general_ci|Нет|Нет|-|
|3|password|varchar(256)|utf8mb3_general_ci|Нет|Нет|-|
|4|name|varchar(256)|utf8mb3_general_ci|Нет|Нет|-|
|5|token|varchar(256)|utf8mb3_general_ci|Да|NULL|-|
|6|friends|longtext|utf8mb4_bin|Нет|'[]'|-|