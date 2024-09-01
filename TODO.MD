# ToDo

- farben fixen
- add inflation to calculation: 'With x% Inflation this money is as much worth as now X€'
- steuer und freibetrag berücksichtigen
- die ganzen type conversion von number zu string und back
- statt datumslabels eigenes alter

## inkonsistenzen

- einz: hier werden immer werte am jahresanfang angezeigt: der steuerwert ist somit in den grafen inkonsistwent.
- ausz: hier werden immer werte am jahresende angezeigt zinsgewinne sind zu hoch, weil unterjährlich geld abgehoben wird

solution: calculate values monthly, generate yearly buckets, only give buckets to graphs

EInz: Lese graph wie folgt 'Im Jahr 2025 habe ich x euro eingezahlt und y euro zinsgewinne gemacht. am Ende des jahres habe die die summe xyz'

Ausz: Lese graph wie folgt 'Im Jahr 35 habe ich mir x euro ausgezahlt. xy musst ich an setueren abgeben. am ende des jahres habe ich die summe xyz'
