# Edtech — projekt strony głównej

Aktualna wersja demo: https://edtech-fresh.sapaqi.chatgpt.site/

Paczka zawiera wersję 10 projektu z ostatnimi zmianami hero: szerszy kadr,
więcej biurka, dostosowanie do wąskich okien i tekst pod zdjęciem poniżej 760 px.

## Pliki

- `index.html` — strona główna.
- `style.css` — wygląd strony, wersje responsywne i animacje.
- `app.js` — megamenu, lista produktów do wyceny, animowane fale i efekty podczas przewijania.
- `assets/` — obrazy, logo i lokalne pliki fontu Nunito.
- `.nojekyll` — umożliwia serwowanie projektu jako zwykłych plików statycznych na GitHub Pages.
- `.gitignore` — wyklucza lokalne pliki pomocnicze i dane środowiska.

To projekt w HTML / CSS / JavaScript. Nie wymaga npm, instalacji zależności,
kompilacji ani dostępu do ChatGPT, aby działać na zwykłym hostingu statycznym.
Wszystkie pliki graficzne i fonty używane przez stronę są w tej paczce.

## Podgląd lokalny

Otwórz `index.html` w przeglądarce. Pełną obsługę funkcji przeglądarkowych,
w tym kopiowania listy produktów, sprawdź przez lokalny serwer.

Jeśli masz Python na Windows, uruchom w katalogu projektu:

```bash
py -m http.server 8000
```

Następnie otwórz `http://localhost:8000`.
Możesz też użyć dowolnego serwera statycznego obsługującego HTML.

## Wrzucenie na GitHub

Rozpakuj ZIP i umieść jego zawartość w katalogu repozytorium.
Plik `index.html` powinien znajdować się w głównym katalogu repozytorium,
obok `style.css`, `app.js` i folderu `assets`.
Nie przesyłaj samego ZIP-a jako jedynego pliku repozytorium.

Dla nowego, pustego repozytorium możesz użyć:

```bash
git init
git add .
git commit -m "Add Edtech homepage project"
git branch -M main
git remote add origin https://github.com/TWOJ-LOGIN/TWOJE-REPOZYTORIUM.git
git push -u origin main
```

Zastąp adres repozytorium swoim adresem. Jeśli repozytorium już istnieje,
skopiuj pliki do jego lokalnej kopii i zatwierdź zmiany w zwykły sposób.
Projekt można hostować z głównego katalogu jako stronę statyczną.

## Zakres działania

To interaktywny projekt wizualny homepage, a nie pełny sklep z backendem.
Linki do produktów, koszyka, konta, formularza kontaktowego i wyszukiwarka
prowadzą do aktualnej strony edtech.ie. Lista produktów do wyceny jest
przechowywana lokalnie w przeglądarce; można ją skopiować do zapytania.
Paczka nie zawiera płatności, logowania ani bazy danych zamówień.

Fale animują się przez SVG, łezki przez CSS. Preferencja ograniczenia animacji
jest respektowana. Megamenu otwiera się po najechaniu lub przyciskiem.

## Informacje dla developera

- Ścieżki lokalne są względne, więc projekt można umieścić także w podkatalogu.
- Zostaw folder `assets` w tej samej lokalizacji względem `index.html`.
- CSS zawiera kolejne poprawki projektu; reguły na końcu pliku mają pierwszeństwo.
- Zachowano również obrazy wskazywane przez starsze reguły CSS.
- Hero zawiera obraz edytowany AI na podstawie oryginalnego materiału.
- Logo, fotografie i grafiki produktów należy traktować jako materiały Edtech
  lub ich odpowiednich właścicieli; paczka nie nadaje im nowej licencji.

Eksport wykonano 5 października 2026 r.
Wersja źródłowa: `9d84efddde5cdd9969660538e9f630b99bb7147e`.
