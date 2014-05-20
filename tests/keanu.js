var keanu_test = (function() {
	var nlp = require("../index")
	var txt = "" +
		"Keanu Charles Reeves is a Canadian actor. Reeves is known for his roles in Bill & Ted's Excellent Adventure, Speed, Point Break, and The Matrix trilogy as Neo. He has collaborated with major directors such as Stephen Frears (in the 1988 period drama Dangerous Liaisons); Gus Van Sant (in the 1991 independent film My Own Private Idaho); and Bernardo Bertolucci (in the 1993 film Little Buddha). Referring to his 1991 film releases, The New York Times' critic, Janet Maslin, praised Reeves' versatility, saying that he displays considerable discipline and range. He moves easily between the buttoned - down demeanor that suits a police procedural story and the loose - jointed manner of his comic roles." +
		"A repeated theme in roles he has portrayed is that of saving the world, including the characters of Ted Logan, Buddha, Neo, Johnny Mnemonic, John Constantine and Klaatu." +
		"In addition to his film roles, Reeves has acted in theatre. His performance in the title role for Manitoba Theatre Centre's production of Hamlet was praised by Roger Lewis of The Sunday Times, who declared Reeves one of the top three Hamlets I have seen, for a simple reason: he is Hamlet." +
		"On January 31, 2005, Reeves received a star on the Hollywood Walk of Fame." +
		"A multifaceted artist, Reeves worked with illustrator Alexandra Grant to author a book, Ode to Happiness. He has also produced a documentary, Side by Side; and directed the film Man of Tai Chi." +
		"Reeves was born in Beirut, Lebanon, the son of Patricia Bond (née Taylor), an English-born costume designer/performer, and Samuel Nowlin Reeves, Jr. His father, who is a Hawaiian-born American, has English, Native Hawaiian, Chinese, Irish, and Portuguese ancestry." +
		"Reeves's mother was working in Beirut when she met his father. Reeves's father was a geologist and earned his GED while imprisoned in Hawaii for selling heroin at Hilo International Airport. He abandoned his wife and family when Reeves was three years old, but Reeves knew him until he was six. They last met on the island of Kauai when Reeves was 13." +
		"Reeves moved around the world frequently as a child and he lived with various stepfathers. After his parents divorced in 1966, his mother became a costume designer and moved the family to Sydney, Australia and then to New York City, USA. There she met and married Paul Aaron, a Broadway and Hollywood director. The couple moved to Toronto, Canada; they divorced in 1971. Reeves's mother married Robert Miller, a rock promoter, in 1976; the couple divorced in 1980. She subsequently married her fourth husband, Jack Bond, a hairdresser; the marriage ended in 1994. Grandparents and nannies babysat Reeves and his sisters, and Reeves grew up primarily in Toronto. Within five years, he attended four high schools, including the Etobicoke School of the Arts, from which he was expelled." +
		"Reeves dreamed of playing hockey for Canada but an injury ended his hopes for a hockey career. After leaving De La Salle College, he attended Avondale Secondary Alternative School, which allowed him to obtain an education while working as an actor. He later dropped out and did not obtain a high school diploma." +
		"In January 2011, on the BBC program The One Show, Reeves spoke of his English ancestry via his mother, mentioning his happy watching of The Two Ronnies comedy show amongst others when younger, and how his mother imparted English manners that he still has today."

	var sentences = nlp.pos(txt)

	sentences.forEach(function(s) {
		console.log(s.text())
		s.to_past()
		console.log(s.text())
		console.log('  ')
		console.log('  ')
	})


	if (typeof module !== "undefined" && module.exports) {
		module.exports = sentences;
	}
	return sentences;
})();
t = keanu_test