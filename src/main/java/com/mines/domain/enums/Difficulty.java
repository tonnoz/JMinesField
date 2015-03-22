package com.mines.domain.enums;

public enum Difficulty {
	EASY(6), MEDIUM(4), HARD(2);	
	private final int diff;
	
	Difficulty(int diff) {
        this.diff = diff;  
    }
    
    public int getDiff() {return diff;}
	
}
