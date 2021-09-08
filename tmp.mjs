import three from 'compromise/three'
import dates from 'compromise/three/dates'

three.plugin(dates)
let doc = three('yeah').debug()
doc.dates()
