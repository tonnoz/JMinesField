package com.mines.domain.enums;

public enum BoardSize{	
	SMALL(10), MEDIUM(20), BIG(30);
    private final int size;

    BoardSize(int size) {
        this.size = size;
      
    }
    
    public int getSize() {return size;}
  
}
