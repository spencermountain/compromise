# A day at the school

This page exercises the Markdown reader with prose, formatting, and protected content.

## Walking to class

She **walked** to [school](https://school.org). He walked home.

They walk*ed* together. We enjoy **strong words**, *gentle emphasis*, and **nested *formatting***.

A punctuation example: foo *bar*! Another example: foo *bar!*.

Visit [the library][library] or <https://example.org>. An escaped \*asterisk\* is ordinary text.

### A smaller heading

#### Fourth level

##### Fifth level

###### Sixth level

Setext heading
--------------

## Lists and quotations

- Apples are fresh.
- Oranges are sweet.
  - Lemons are sour.

1. Open the notebook.
2. Write a sentence.

> A thoughtful quotation.
>
> Another paragraph with **important words**.
>
> > A nested quotation.

## Whitespace and boundaries

A soft line
continues this sentence.

A hard break follows here.  
The next line starts here.

Standalone paragraph alpha

Standalone paragraph beta

## Code and media

Before `inlineSecret` after.

```javascript
const fencedSecret = 'walked';
console.log(fencedSecret);
```

    indentedSecret stays in code.

![imageSecret](https://example.org/picture.png "A picture")

![referenceImageSecret][picture]

<div>
htmlSecret stays outside the linguistic input.
</div>

Before <span>visible words</span> after.

---

## Extension syntax

The following examples require GFM or footnote parser extensions to become specialized AST nodes.
With the default parser, they remain ordinary Markdown text.

| Item | Description |
| --- | --- |
| Notebook | A place to write |
| Pencil | A tool for drawing |

- [ ] An unchecked task
- [x] A completed task

This ~~crossed-out phrase~~ needs GFM strikethrough support.

A footnote reference[^note] also needs a parser extension.

[^note]: Footnote explanation.

## Final paragraph

The final paragraph contains a unique farewellToken for the smoke tests.

[library]: https://library.example.org "The library"
[picture]: https://example.org/reference.png
