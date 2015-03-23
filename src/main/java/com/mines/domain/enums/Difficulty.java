package com.mines.domain.enums;

public enum Difficulty {
	EASY(15), MEDIUM(6), HARD(2);	
	private final double diff;
	
	Difficulty(int diff) {
        this.diff = diff;  
    }
    
    public double getDiff() {return diff;}
	
}
