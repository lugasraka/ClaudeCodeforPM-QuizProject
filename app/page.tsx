useEffect(() => {
    if (started && !showResults && shuffledQuestions.length > 0) {
      const currentTheme = shuffledQuestions[currentQuestion].theme;
      playAmbiance(currentTheme);
    } else {
      stopAmbiance();
    }
  }, [currentQuestion, started, showResults, shuffledQuestions]);