export const getChuckNorrisAnswer = async () => {
    const answerRaw = await fetch('https://api.chucknorris.io/jokes/random');
    const answer = await answerRaw.json();

    return answer.value
};
