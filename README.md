# warsawjs-workshop-45

📁 WarsawJS Workshop #45 — JavaScript: Zaawanasowany


## Demo 🎉

<https://dkarski.github.io/warsawjs-workshop-45/>


## Slides

- <https://slides.com/danielkarski/workshop-45>


## Agenda
1. Prototypes, inheritance
1. When class is useful?
1. Data types: Map & Set and WeakMap and WeakSet


## Sources
1. [javascript.info: prototypes](https://javascript.info/prototypes)
1. [javascript.info: classes](https://javascript.info/classes)
1. [javascript.info: map and set](https://javascript.info/map-set)
1. [javascript.info: weakmap and weakset](http://javascript.info/weakmap-weakset)
1. [SOLID, DRY, KISS itp.](https://devcave.pl/notatnik-juniora/zasady-projektowania-kodu)
1. [stackoverflow: What are the actual uses of ES6 WeakMap?](https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap)
1. [Krzysztof Ciebiera: JavaScript prototypy](https://www.youtube.com/watch?v=8C4GcoPeFj8&amp;list=PL1zPcOuyA-yZl4SXHgGhdy7gwRpH9F2eB&amp;index=3&amp;t=0s)
1. [Overment: ES6 - Obiekt Map - JavaScript](https://youtu.be/NV54JW_PaeA)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://dkarski.github.io/warsawjs-workshop-45/issues/).


## Show your support

Give a ⭐️ if this project helped you!


## Zadania

### 1. Utwórz reprezentacje klasy dla każdego obiektu tworzonego w zdarzeniu dodania pliku.

#### Opis

Tworzenie obiektu, który prezentuje dany typ pliku odbywa się w metodzie [uploadFile](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/app/file-manager/file-upload-input/file-upload-input.js#L19) w komponencie [FileUploadInput](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/app/file-manager/file-upload-input/file-upload-input.js#L14).
Utworzenie danego pliku w innym miejscu aplikacji sprawi, że logika tworzenia obiektu zostanie zduplikowana, aby temu zapobiec,
utwórz dla każdego typu obiektu jej reprezentacje klasy.

#### Wskazówki

1. Obiekty znajdziesz w metodzie [uploadFile](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/app/file-manager/file-upload-input/file-upload-input.js#L19) w komponencie [FileUploadInput](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/app/file-manager/file-upload-input/file-upload-input.js#L14).
1. Zwróć uwagę, że generowanie wartości `id` nie jest związane z tworzeniem obiektu.
1. Zobacz czy możesz część właściwości wydzielić do klasy nadrzędnej, by uniknąć redundancji kodu.
1. **Dodatkowo**: Zastanów się, jak zrefaktoryzować metodę [uploadFile](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/app/file-manager/file-upload-input/file-upload-input.js#L19) by była zamknięta na modyfikacje,
   przy dodaniu nowego typu pliku.


### 2. Ogranicz dostęp do funkcji `transformBytes` w globalnym zasięgu.

#### Opis

Funckcja `transformBytes` została przypisana do globalnego obiektu window w [index.html](https://github.com/dkarski/warsawjs-workshop-45/blob/master/index.html#L32). Jest ona używana w widoku szczegółu
pliku, by wyświetlić czytelniejszy dla użytkownika format rozmiaru pliku. Aktualnie taka deklaracja zaśmieca globalną
przestrzeń nazw i jest wrażliwa na nadpisanie w innych miejscach applikacji czy przez importowane biblioteki. Spróbuj przenieść tą funkcję
do klasy bazowej `File`, dzięki temu ukryjesz ją przed innymi klasami i sprężysz ją z podklasami, na których metoda będzie używana.


#### Wskazówki

1. Skrypt do usunięcia znajduje się w index.html
1. Przy przenoszeniu `transformBytes` do klasy bazowej `File` odwołaj się do właściwości `size` zamiast oczekiwać na argument.


### 3. Przywróć i napraw wyświetlanie listy dostępnych typów plików 

#### Opis

W aplikacji został zakomentowany komponent, który wyświetla błednie liste elemntów, po której można
filtrować (tzw. **[HOTFIX](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/app/file-manager/file-manager.js#L21)**). Ta funckjonalność znajduje się w metodzie [render](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/app/file-manager/file-type-list/file-type-list.js#L34) klasy [FileTypeList](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/app/file-manager/file-type-list/file-type-list.js#L4). Aktualna implementacja
zwraca zduplikowane wartości, sprawiając że każdy dodany nowy plik wydłuża liste typów. Spraw by przekazywana lista 
do metody generateHTMLString posiadała unikalne wartości.  

#### Wskazówki

1. Do znalezienia wszystkich aktualych typów plików, możesz wykorzystać metodę `getFileList` z klasy [Store](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/store/store.js). Zwraca ona listę
wszystkich plików, które między innymi mają pole `type`.
1. Do utworzenia listy z unikalnymi wartościami możesz się posłużyć klasą `Set`.


### 4. Zmień strukture danych z `Array` na `Object` lub `Map` dla `files` w stanie aplikacji.

#### Opis

Aktualnie pobieranie i usuwanie elementu z listy wymaga iterowania po liście `files`. Spraw by można było pobierać
i usuwać element bez iteracji.  

#### Wskazówki

1. Lista `files` znajduje się w obiekcie `state` klasy [Store](https://github.com/dkarski/warsawjs-workshop-45/blob/master/src/store/store.js).
1. Pamiętaj, by przy zmianie uwzględnić wszystkie metody klasy Store które sięgają do właściwości `files`: `getFileById`,
`getFileList`, `addFile` oraz `removeFileById`.



#### Powodzenia! 💪
