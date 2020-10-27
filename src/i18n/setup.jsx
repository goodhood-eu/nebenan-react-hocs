import Polyglot from 'node-polyglot';

const logMissing = (error) => console.error(error);

const createTranslatorInstance = ({ type, dictionary }) => {
  const polyglot = new Polyglot({
    locale: type,
    phrases: dictionary,
    warn: logMissing,
  });

  polyglot.t = polyglot.t.bind(polyglot);

  return polyglot;
};

export default createTranslatorInstance;
