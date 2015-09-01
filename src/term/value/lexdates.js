// From redaktor Branch
exports.dates = (function() {
  var zip = { months:
   { january: 0,
     february: 1,
     march: 2,
     april: 3,
     may: 4,
     june: 5,
     july: 6,
     august: 7,
     september: 8,
     october: 9,
     november: 10,
     december: 11 },
  monthAbbrevs:
   { jan: 0,
     feb: 1,
     mar: 2,
     apr: 3,
     jun: 5,
     jul: 6,
     aug: 7,
     sep: 8,
     sept: 8,
     oct: 9,
     nov: 10,
     dec: 11 },
  days:
   { monday: 1,
     tuesday: 2,
     wednesday: 3,
     thursday: 4,
     friday: 5,
     saturday: 6,
     sunday: 7 } };

  var main = (function () {
        var res = zip;
        for (var w in zip.monthAbbrevs) { zip.months[w] = zip.monthAbbrevs[w] }
        res.dayS = '\b('.concat(Object.keys(res.days).join('|'), ')\b');
        res.monthS = '('.concat(Object.keys(res.months).join('|'), ')');
        res.monthsS = res.monthS + ',?';
        return res;
      })();

  return main;
})();
