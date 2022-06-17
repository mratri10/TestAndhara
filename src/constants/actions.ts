export const HOMETAB = 'HOMETAB';
export const PROFILETAB = 'PROFILETAB';
export const SCANTAB = 'SCANTAB';
export const ROUTE = 'ROUTE';

export const GETCAMERAURI = 'GETCAMERAURI';

//Validation

export const NAMAVALIDATION = {
  required: {
    value: true,
    message: 'Nama Harus Diisi',
  },
};

export const USIAVALIDATION = {
  required: {
    value: true,
    message: 'Usia Harus Diisi',
  },
  max: {
    value: 100,
    message: 'Usia Anda Terlalu Tua',
  },
};

export const HOBIVALIDATION = {
  required: {
    value: true,
    message: 'Hobi Harus Diisi',
  },
};

export const EMAILVALIDATION = {
  required: {
    value: true,
    message: 'Email Harus Diisi',
  },
  pattern: {
    value:
      /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+.(?:[a-zA-Z0-9]+.)+[A-Za-z]+$/,
    message: 'Email Tidak Valid',
  },
};

export const PHONEVALIDATION = {
  required: {
    value: true,
    message: 'Phone Harus Diisi',
  },
  minLength: {
    value: 8,
    message: 'Huruf harus kurang dari 8',
  },
};
