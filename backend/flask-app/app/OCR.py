import lib.ruslang_handwriting_ocr.doc2text.reader as Reader


class OCR:

    def get_text(self, path_to_image):
        reader = Reader()
        result = reader.doc2text(path_to_image)

        return result[0]
