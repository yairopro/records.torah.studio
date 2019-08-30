import sefaria from "./sefaria";
import sections from "./sections";
import Arrays from "../../utils/Arrays";

/*
  Format:
  [
    title: (sefer),
    sidrot: [
      {
        title: (sidra),
        aliot: [
          [
            "pasuk"
          ]
        ]
      }
    ]
  ]
 */

export default ["genesis", "exodus", "leviticus", "numbers", "deuteronomy"].map(
  (title, index) => ({
    title,
    sidrot: sections[index].map(({ title, refs }) => ({
      title,
      aliot: refs.map(([start, end]) => {
        let sefer = sefaria[index].text;
        start = { perek: start[0] - 1, pasuk: start[1] - 1 };
        end = { perek: end[0] - 1, pasuk: end[1] - 1 };

        if (start.perek === end.perek)
          return sefer[start.perek].slice(start.pasuk, end.pasuk);

        let startPerek = sefer[start.perek].slice(start.pasuk);
        let betweenPereks = Arrays.range(end.perek - start.perek + 1).map(
          number => sefer[start.perek + number]
        );
        let endPerek = sefer[start.perek].slice(0, end.pasuk);

        return [...startPerek, ...betweenPereks.flat(), ...endPerek];
      })
    }))
  })
);
