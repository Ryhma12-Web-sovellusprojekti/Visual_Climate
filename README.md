# Visual Climate -sovellusprojekti

IN00CT06-3004 Web-ohjelmoinnin sovellusprojekti - kevät 2023
Ryhmä 12: Joose Ahonen, Jussi Mäki, Essi Nissinen ja Justiina Ronkainen
GitHubin linkki: https://github.com/Ryhma12-Web-sovellusprojekti/Visual_Climate.git


## Taustaa

Tämä työ on osa Oulun ammattikorkeakoulun kevään 2023 Web-ohjelmoinnin sovellusprojektia. Tavoitteena on tehdä ilmastonmuutoksen historiallisia muutoksia visualisoiva responsiivinen web-ohjelma nimeltään Visual Climate. Ohjelmaan kirjaudutaan sisään sähköpostilla, minkä jälkeen käyttäjä voi valita kolmen näkymän välillä: 1) Maapallon lämpötilan ja hiilidioksidipitoisuuksien muutokset, 2) Päästölähteet ja 3) Käyttäjän luoma oma visualisointinäkymä. Käyttäjä pystyy luomaan useita itse tekemiään näkymiä, tallentamaan ja poistamaan niitä sekä jakamaan niitä eteenpäin julkisella osoitteella, ilman kirjautumista tarkasteltavaksi.

### Näkymä 1

Ensimmäisen näkymän teemana on maapallon lämpötilan ja hiilidioksidin määrän muutokset. Näkymässä on kolme kuvaajaa, joista ensimmäisessä esitetään maailman pintalämpötilan kehitys vuodesta 1850 vuoteen 2023 (Morice ym. 2021). Käyttäjä voi valita kuvaajaan näytettäväksi koko maapallon, pohjoisen pallonpuoliskon tai eteläisen pallonpuoliskon lämpötilat sekä joko vuosittaiset tai kuukausittaiset arvot. Lisäksi käyttäjä voi halutessaan lisätä kuvaajaan pohjoisen pallonpuoliskon lämpötilan mallinnuksen viimeisten 2000 vuoden ajalta (Moberg ym. 2005).

Kuvaajassa 2 esitetään ilmakehän hiilidioksidipitoisuuden muutoksia ajan funktiona viimeisten 1 000 vuoden ajalta. Kuvaajassa valittavana olevat kuukausittaisten ja vuosittaisten hiilidioksidiarvojen mittaukset on tehty Mauna Loan observatoriossa Havaijilla (NOAA GML 2023). Näiden arvojen lisäksi käyttäjä voi valita kuvaajaan näytettäväksi mittausarvot näytteistä, jotka on kerätty Etelämantereella sijaitsevan Law Dome -jäätikön jääkerroksesta. Pitoisuusdata on esitetty ppm-yksiköissä (osaa miljoonasta) ja se ulottuu nykypäivään saakka. Kuvaajasta voidaan havaita, että hiilidioksidipitoisuudet ovat pysyneet suhteellisen vakaina viimeiset 1 000 vuotta, mutta kasvaneet nopeasti teollistumisen myötä 1800-luvun lopulta lähtien. Tämä viittaa siihen, että ihmisten toiminta on merkittävästi vaikuttanut ilmakehän hiilidioksidipitoisuuden kasvuun (CDIAC 2023).

Kuvaajassa 3 mallinnetaan maapallon lämpötilan muutokset viimeisen kahden miljoonan vuoden ajalta sekä ilmakehän hiilidioksidipitoisuudet viimeisen 800 000 vuoden ajalta (Snyder 2016). Tämän lisäksi käyttäjä voi lisätä kuvaajaan muutamia ihmisen ja maapallon kehitykseen liittyviä historiallisia tapahtumia ja tarkastella niiden mahdollisia vaikutuksia lämpötilaan ja/tai hiilidioksidipitoisuuteen (Doncaster 2023).

### Näkymä 2

Toisen näkymän kuvaajissa 4 ja 5 esitetään maailman päästölähteitä ja niiden muutoksia eri aikakausina. Kuvaajassa 4 esitetään maapallon hiilidioksidipäästöjen määrän kehitys yli 200 maan osalta vuosien 1959–2020 ajalta. Kuvaaja näyttää käyttäjän valitsemien maiden perusteella Hallitustenvälisen ilmastonmuutospaneelin (IPCC) Global Carbon Budget 2021 -raportista peräisin olevat hiilidioksidipäästöjen vuosittaiset kokonaismäärät (ICOS Carbon Portal 2021).

Kuvaaja 5 on ympyräkuvaaja, jossa esitetään maailman hiilidioksidipäästöt sektoreittain. Kuvaajassa näkyy ensin neljä pääsektoria (energia, maanviljelys ja metsänhoito, teollisuus ja jätteet), joista käyttäjä voi klikkaamalla avata pääsektorin päästöjen jakaumat alasektoreittain uuteen kuvaajaan (Ritchie & Roser 2022).

### Käyttäjäkohtainen näkymä

Kolmannessa sovelluksen tarjoamassa näkymässä käyttäjä voi rakentaa ja tallentaa oman näkymänsä. Näkymään on valittavissa muissa näkymissä esitetyt kuvaajat ja lisäksi käyttäjä voi kirjoittaa näkymään oman kuvaustekstinsä. Kun näkymä on valmis, se voidaan tallentaa tietokantaan. Tämän jälkeen käyttäjä voi jakaa näkymän nähtäväksi myös muille yksilöllisen URL-osoitteen avulla. Tallennettua näkymää pääsee tarkastelemaan kirjautumatta sisälle sovellukseen. 

## Käytetyt teknologiat

### Wireframe ja Stoplight

Ennen projektin toteutuksen aloittamista web-sovelluksen käyttöliittymä suunniteltiin Wireframe-palvelussa ja ohjelmointirajapinta suunniteltiin hyödyntäen Stoplight-web-sovellusta. Käyttöliittymäsuunnitelmassa ensimmäisenä avautuva kirjautumissivu suunniteltiin rakenteeltaan erilaiseksi verrattuna päänäkymään, joka aukeaa kirjautumisen jälkeen. Päänäkymässä sivun oikeassa laidassa näkyvä sivupalkki pysyy samalla paikalla käyttäjän vaihtaessa näkymiä (Kuva 1). Päänäkymän painikkeista avautuvat osiot päivittyvät sivun main-osioon.

<img src="assets/fig1.png"
     alt="Visual Climate Main Page"
     align="center"
     width="100%"
/>
 
Kuva 1. Käyttöliittymäsuunnitelman kuva päänäkymästä, jossa käyttäjä on kirjautuneena sisälle sovellukseen. Oikeassa reunassa on kuvattu sivupalkki, jossa esitetään käyttäjän kuva sekä napit, joiden avulla käyttäjä voi kirjautua ulos sovelluksesta tai poistaa käyttäjätilinsä.  

### Firebase ja tietokantarakenne

Firebase on Googlen sovelluskehitykseen tarkoitettu alusta, joka tarjoaa erilaisia mobiili- ja web-sovelluksiin tarvittavia palveluja (Google 2023a). Firebase-palveluun luotiin ensin pohja tätä projektia varten, jonka jälkeen valittiin halutut palvelut. Tässä projektissa käytettiin autentikaatiopalvelua kirjautumiseen (Firebase Authentication) sekä pilvipalvelua datan tallennukseen (Cloud Firestore). Autentikaation sai käyttöön Firebase-sivuston consolessa, jossa voi valita kirjautumismenetelmäksi esimerkiksi sähköpostin, Google- tai Facebook-tunnuksen (Google 2023a). Tähän projektiin valittiin kirjautumisvaihtoehdoksi sähköposti.

Cloud Firestore on noSQL-tietokanta eli perinteisestä relaatiomallista poikkeava tietokanta. Se on suunniteltu helppoon datan tallennukseen, synkronisointiin ja hakemiseen. Firebase tarjoaa kaksi vaihtoehtoa tietokannan tallennukseen, Firestore tai Realtime Database. Firestore toimii hyvin käyttäjän syöttämien tietojen tallennukseen, joten sitä käytettiin tässä projektissa käyttäjäkohtaisten näkymien tietojen tallentamiseen. Realtime-tietokantaan on puolestaan helpompi tallentaa iso määrä dataa kerralla, joten kuvaajien piirtämiseen käytetty data tallennettiin Firebasen Realtime Databaseen (Google 2023). Realtime Databaseen voi tuoda vain yhden json-tiedoston (JavaScript Object Notation), joten kaikki data yhdistettiin ennen tallennusta yhdeksi json-objektiksi. Tietokantarakenne muodostui siten, että jokaiseen kuvaajaan käytettävä data muodosti oman sisäkkäisen json-objektin (Kuva 2A). Sisäkkäiset json-objektit nimettiin käyttämällä kuvaajan numeroa sekä kyseisten tietojen kuvausta. Esimerkiksi kuvaajassa 1 käytetyt vuosittaisten hiilidioksidipäästöjen objektit nimettiin V1_Annual (V tulee englannin kielen sanasta visualization). Yksittäisten json-objektien avain (key) vastasi yleensä vuosilukua tai vuosi-kuukausiyhdistelmää ja arvo (value) oli mittaustulos (Kuva 2B). Kuvaajan 5 datassa ei ollut vuosilukuja, joten sen rakenne oli erilainen (Kuva 2C).

<img src="assets/fig2.png"
     alt="Visual Climate Data Structure"
     align="center"
     width="100%"
/>

Kuva 2. Kuvaajiin käytettävän datan tietokantarakenne. (A) Sisäkkäiset json-objektit on nimetty niin, että niistä näkee, mihin kuvaajaan (V1-V5) kyseinen objekti kuuluu. (B) Esimerkki yksittäisen json-objektin alusta, missä avain vastaa vuosilukua ja arvo mittaustulosta. (C) Kuvaajan 5 datarakenne poikkeaa muista, sillä siinä ei tarkasteltu vuosittaista vaihtelua vaan hiilidioksidipäästöjen osuuksia eri sektorien välillä.

### Node.js REST-rajapinta

Web-sovellukselle tehtiin REST-rajapinta, joka toteutettiin Node-palvelimella. REST (Representational State Transfer) on arkkitehtuurimalli, joka määrittelee, miten eri ohjelmistojärjestelmät voivat kommunikoida keskenään internetin yli käyttäen esimerkiksi HTTP-protokollaa (Hypertext Transfer Protocol) (Gupta 2022). Sovelluksen palvelimelle tehtiin CRUD-toiminnot (Create, Read, Update, Delete), joiden avulla mahdollistettiin tietojen vieminen, hakeminen, päivitys ja poisto Firebase-tietokannasta. CRUD-toimintojen palautusarvona saatiin tieto, onnistuiko halutun toiminallisuuden toteuttaminen tietokantaan.

### React, CSS ja Frontend

CSS (Cascading Style Sheets) on kieli, jota käytetään verkkosivujen ulkoasun määrittämiseen. CSS-Gridiä käytettiin sovelluksen responsiivisen taiton rakentamiseen. Käyttöliittymäsuunnitelman pohjasta luotiin staattinen HTML/CSS-sivusto, jossa demonstroitiin komponenttien visuaalinen ilme. React on JavaScript-kirjasto, joka on suunniteltu komponenteista muodostuviin dynaamisten käyttöliittymien rakentamiseen. React-kirjastoa hyödyntäen toteutettiin eri komponentteja, joita käyttämällä sovellukseen rakennettiin eri näkymät. Sovelluksen käyttämä data haettiin käyttöliittymän hyödynnettäväksi JavaScriptin Axios-kirjastolla luotujen kutsujen avulla, jotka kommunikoivat palvelimen kanssa.  

### Chart.js

Web-sovelluksen kuvaajat toteutettiin Chart.js JavaScript-kirjastoa hyödyntäen. Kirjasto mahdollistaa monenlaisten kaavioiden toteuttamisen sekä niiden yhdistämisen. Chart.js on myös yhteensopiva erilaisten JavaScriptin sovelluskehysten, kuten Reactin, Vuen, Svelten ja Angularin kanssa (Chart.js 2023).

## Tekijät ja työnjako

Projektiryhmään numero 12 kuuluivat Joose Ahonen (GitHub-tunnus runtuaho), Essi Nissinen (E55i), Justiina Ronkainen (justiina) ja Jussi Mäki (Tuskajussi). Joose pystytti Firebase-projektin ja vastasi datan lisäämisestä ja hakemisesta tietokannoista. Hän myös teki autentikaation tokeneita käyttäen serverin ja palvelimen välille, sekä toteutti kuvaajan 4. Lopuksi Essi kommentoi ja siisti serveri puolen koodit ja Joose Palvelimen. Essi pystytti projektille GitHub-organisaation, vastasi käyttöliittymäsuunnitelman tekemisestä Wireframe-ohjelmalla, suunnitteli REST-rajapinnan yhdessä Joosen kanssa Stoplight-ohjelmalla sekä toteutti kuvaajat 1 ja 2. Lisäksi Essi teki käyttöliittymän puolelle sisäänkirjautumissivun Sign in ja Sign out -toiminallisuudet, käyttäjäkohtaisen näkymän toiminnallisuuksia ja palvelinpuolen CRUD-operaatioita yhdessä Justiinan kanssa. Essi teki myös testit, jotka testaavat rajapinnassa tapahtuvaa käyttäjän luomista, sisäänkirjautumista sekä käyttäjän poistamista sekä käyttöliittymäpuolen komponenttitestit. Justiina vastasi kuvaajiin käytettävien tietokantojen muokkaamisesta, kääntämisestä ja yhdistämisestä yhdeksi json-objektiksi, client- ja serveriohjelmien pystyttämisestä, axios-kutsuista, käyttäjän luomisesta ja kirjautumisesta, kuvaajista 3 ja 5 sekä käyttäjäkohtaisen näkymän tallennuksesta ja jakamistoiminnosta. Jussi vastasi React-sivuston taustarakenteen toiminnallisuuden toteutuksesta, asettelusta ja responsiivisuudesta sekä CSS-tiedostosta, käyttäjän poistamisesta ja Frontendin End-to-End testauksesta. Kaikki ryhmän jäsenet osallistuivat palavereihin, joissa käytiin läpi mahdollisia ongelmatilanteita ja oman vastuualueen edistymistä.

## Ohjeet sovelluksen käyttöönottoon 

Sovellus löytyy GitHubista osoitteesta https://github.com/Ryhma12-Web-sovellusprojekti/Visual_Climate.git. 
1.	Avaa koneellasi resurssienhallinta, navigoi haluttuun kansioon ja avaa Git Bash tai muu komentorivityökalu. 
2.	Aja komento git clone https://github.com/Ryhma12-Web-sovellusprojekti/Visual_Climate.git. 
3.	Vie server-kansion sisälle creds.json ja firebase.json tiedostot sekä client-kansion src-kansioon firebase-config.json-tiedosto. Tiedostot ovat salaisia configure-tiedostoja, joten ne löytyvät vain Moodlen palautuskansiosta. 
4.	Avaa sovellus esimerkiksi Visual Studio Codessa ja avaa sovelluksessa terminal-ikkuna. 
5.	Navigoi terminal-ikkunassa server-kansioon komennolla cd server ja aja komento npm install.  
6.	Tämän jälkeen käynnistä palvelin komennolla node startServer.js.
7.	Avaa uusi terminal-ikkuna ja navigoi client-kansioon komennolla cd client.
8.	Aja komento npm install ja käynnistä sen jälkeen sovellus komennolla npm start.
9.	Sovellus avautuu selaimeen.

## Testaus

Sovelluksen käyttöliittymän näkymiä kuten kirjautumiseen ja käyttäjän luomiseen liittyviä lomakkeita testattiin Reactin testikirjaston sekä Jestin ja Puppeteerin avulla. Testeissä tutkitaan näkyvätkö halutut elementit ja reagoivatko ne oikein, kun käyttäjä syöttää tekstiä. 
Ohjeet client- testien ajamiseen:
1.	Testit löytyvät sovelluksessa kansiopolusta client/src/components/__test__. 
2.	Käynnistä ensin palvelin server-kansion sisällä komennolla node startServer.js. 
3.	Navigoi sen jälkeen uudessa terminal-ikkunassa client-kansioon ja käynnistetään client komennolla npm start
4.	Avaa vielä kolmas terminal-ikkuna ja käynnistä testit ajamalla npm test.
Myös sovelluksen rajapinnalle tehtiin testejä JavaScriptin Mocha ja Chai-testikirjastoja hyödyntäen. Testeissä käydään läpi käyttäjän luominen, kirjautuminen sekä käyttäjän poistaminen rajapinnan näkökulmasta. 
Ohjeet rajapinnan testien ajamiseen:
1.	Testit löytyvät sovelluksen kansiopolusta server/test. 
2.	Navigoi terminal-ikkunassa server-kansioon ja aja komento npx mocha. Tämä komento myös käynnistää palvelimen testien ajaksi, jolloin sitä ei tarvitse käynnistää erikseen.

## Valmiin ohjelman esittely

Sovellusta avatessa ensimmäisenä tulee näkyviin kirjautumissivu, jossa käyttäjä voi myös rekisteröityä, jos hänellä ei vielä ole tunnuksia. Kirjautumisen jälkeen käyttäjä pääsee sisälle sovellukseen. Kirjautuneena käyttäjän on mahdollista tarkastella näkymää 1, josta löytyy kolme kuvaajaa sekä näkymää 2, josta löytyy kaksi kuvaajaa. Käyttäjän on myös mahdollista luoda oma näkymä, johon hän voi valita haluamansa kuvaajat ja kirjoittaa niille esittelytekstit. Kun käyttäjän luoma näkymä on tallennettu, se voidaan jakaa yksilöllisen URL-osoitteen avulla halutuille henkilöille. Tallennettua näkymää pääsee tarkastelemaan URL-osoitteen avulla ilman sisäänkirjautumista. Sisään kirjautuneena käyttäjä voi myös kirjautua ulos sovelluksesta tai poistaa käyttäjätunnuksensa. Nämä valinnat ovat näkyvillä sisään kirjautuneelle käyttäjälle sovelluksen oikeassa laidassa sijaitsevassa profiilipalkissa. Sovelluksen esittelyvideo löytyy osoitteesta https://youtu.be/TcrGtvJtpgY.

## Lähteet

Andrew Rachel. Grid by Example. Hakupäivä 1.5.2023 https://gridbyexample.com/

CDIAC 2023. Law Dome CO2 and CH4 Data. Hakupäivä 13.4.2023. https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html.

Doncaster, C. Patrick 2023. Timeline of the Human Condition - Milestones in Evolution and History. Hakupäivä 3.4.2023. https://www.southampton.ac.uk/~cpd/history.html.

Chart.js 2023. Why Chart.js. Hakupäivä 30.4.2023. https://www.chartjs.org/docs/latest/.

Google 2023a. Firebase. Hakupäivä 3.4.2023. https://firebase.google.com/.

Google 2023b. Firebase Authentication. Hakupäivä 3.4.2023. https://firebase.google.com/products/auth.

Google 2023c. Firebase Realtime Database. Hakupäivä 3.4.2023. https://firebase.google.com/docs/database.

Gupta, Lokesh 2022. What is REST. Hakupäivä 30.4.2023. https://restfulapi.net.

ICOS Carbon Portal 2021. Global Carbon Budget 2021. Hakupäivä 13.4.2023 https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021.

Moberg, Anders, Sonechkin, Dmitry M., Holmgren, Karin, Datsenko, Mina H. & Wibjörn, Karlén 2005. Highly variable Northern Hemisphere temperatures reconstructed from low- and high-resolution proxy data. Nature 2005 433:7026 433(7026):613–17. doi: 10.1038/nature03265.

Morice, C. P., Kennedy J. J., Rayner N. A., Winn J. P., Hogan E., Killick R. E., Dunn R. J. H., Osborn T. J., Jones P. D. & Simpson I. R. 2021.
An Updated Assessment of Near-Surface Temperature Change From 1850: The HadCRUT5 Data Set. Journal of Geophysical Research: Atmospheres 126(3):e2019JD032361. doi: 10.1029/2019JD032361.

NOAA GML 2023. Carbon Dioxide (CO2) Measurements from Flask Air Samples. Hakupäivä 13.4.2023. https://gml.noaa.gov/ccgg/about/co2_measurements.html.

Ritchie, Hannah & Roser, Max 2022. CO₂ and Greenhouse Gas Emissions - Emissions by Sector. Our World in Data. Hakupäivä 13.4.2023. https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector.

Snyder Carolyn W. 2016. Evolution of global temperature over the past two million years” Nature 2016 538:7624 538(7624):226–28. doi: 10.1038/nature19798.

