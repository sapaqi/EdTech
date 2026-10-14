# Edtech — homepage redesign

Aktualna wersja v15, 14 października 2026.
Statyczna strona HTML/CSS/JavaScript. Nie wymaga npm ani kompilacji.

## Pliki
- index.html — strona główna
- style.css — style i wersja responsywna
- app.js — menu, podpowiedzi wyszukiwania, FAQ, lista wyceny i animacje
- assets/ — lokalne obrazy i fonty

## Wgranie do GitHuba
1. Rozpakuj ZIP.
2. Wgraj całą zawartość do repozytorium, zachowując katalog assets.
3. index.html powinien znajdować się w katalogu głównym repozytorium.

## Uruchomienie
Otwórz index.html w przeglądarce lub użyj lokalnego serwera statycznego.

## Zakres demonstracji
Linki zakupowe, wyszukiwarka i kontakt prowadzą do edtech.ie.
Lista wyceny przechowuje wybór lokalnie w przeglądarce; nie wysyła zamówienia.
Podpowiedzi popularnych wyszukiwań są przykładowe. Treści FAQ wymagają akceptacji klienta.
Key stats: 4 grupy odbiorców, 24 kategorie Hardware, 21 kategorii Software.
Linki nowych kategorii uruchamiają wyszukiwanie produktu w obecnym sklepie.
Przed wdrożeniem produkcyjnym należy dopasować docelowe adresy do routingu sklepu/CMS.

V12: statystyki bez kart; jednolite tła FAQ #EFF8F5.

V13: poprawiony kształt SVG łezek w Key stats oraz delikatna animacja.

V14: Book demo jako primary CTA, My account jako secondary oraz ciemna sekcja Specific Needs po Featured Products. Book demo prowadzi do kontaktu; kategorie potrzeb prowadzą do wyszukiwania produktów.

V15: sticky header, megamenu Specific Needs, Book a demo w głównym menu, Quick links przed Legal links, animowana fala nad sekcją rozwiązań.
