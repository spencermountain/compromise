import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-root] '

test('verb-root', function (t) {
  let arr = [
    ['beg', 'He begged his parents for a new toy.'],
    ['beg', 'She begged her boss for a raise.'],
    ['bow', 'She bowed to the queen with respect.'],
    ['bow', 'He bowed his head in prayer.'],
    ['bow', 'They bowed to the audience after their performance.'],
    ['bow', 'The gymnast bowed gracefully at the end of her routine.'],
    ['chew', 'He chewed the gum with a loud smacking sound.'],
    ['chew', 'She chewed on her pencil while thinking.'],
    ['clap', 'The audience clapped loudly after the performance.'],
    ['clap', 'She clapped her hands in excitement.'],
    ['clap', 'The children clapped along to the song.'],
    ['clap', 'He clapped his friend on the back as a sign of congratulations.'],
    ['court', 'He courted her with flowers and chocolates.'],
    ['court', 'She courted controversy with her outspoken comments.'],
    ['court', 'He courted disaster by not following safety guidelines.'],
    ['flap', 'The bird flapped its wings and flew away.'],
    ['flap', 'She flapped the rug to remove the dust.'],
    ['flap', 'He flapped the newspaper to catch the attention.'],
    ['flap', 'The flag flapped in the wind.'],
    ['jam', 'We jammed together and improvised some great melodies.'],
    ['jam', 'They jammed in the basement until late into the night.'],
    ['model', 'The architect is modeling the new building in a computer software.'],
    ['murmur', 'She murmured a soft \'thank you\' to him.'],
    ['murmur', 'The wind murmured through the trees.'],
    ['murmur', 'He murmured an apology and left the room.'],
    ['murmur', 'The crowd murmured in anticipation of the show.'],
    ['oil', 'She oiled the pan before cooking to prevent sticking.'],
    ['oil', 'The mechanic oiled the car engine to ensure its proper functioning.'],
    ['scar', 'The accident scarred her face for life.'],
    ['scar', 'His childhood trauma scarred him emotionally.'],
    ['scar', 'The war has scarred the country\'s landscape.'],
    ['slap', 'He slapped his friend on the back.'],
    ['slap', 'She slapped the mosquito on her arm.'],
    ['slap', 'The teacher slapped the ruler on the desk.'],
    ['slap', 'The man slapped his own face in frustration.'],
    ['snap', 'She snapped the pencil in half.'],
    ['snap', 'He snapped his fingers to get attention.'],
    ['snap', 'The dog snapped at the mailman.'],
    ['snap', 'She snapped a photo of the sunset.'],
    ['sway', 'The boat swayed from side to side in the rough sea.'],
    ['trot', 'She trotted down the street with her dog.'],
    ['trot', 'He trotted over to the table to grab a snack.'],
    ['trot', 'The children trotted hand in hand through the park.'],
    ['wink', 'She winked at me from across the room.'],
    ['wink', 'He winked and gave me a sly smile.'],
    ['yell', 'He yelled for help when he saw the fire.'],
    ['yell', 'She angrily yelled at him for the mistake.'],
  ]

  arr.forEach(a => {
    let [word, str] = a
    let doc = nlp(str)
    t.equal(doc.has(`{${word}/verb}`), true, here + str)
  })
  t.end()
})
