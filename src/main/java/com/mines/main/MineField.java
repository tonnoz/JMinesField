package com.mines.main;

import com.mines.domain.enums.BoardSize;
import com.mines.domain.enums.Difficulty;


public class MineField{
	
	private int[][] field;
	private BoardSize size;
	private Difficulty diff;
	
	
	
	public MineField(){
		diff = Difficulty.EASY;
		size = BoardSize.MEDIUM;
		neww();
			
	}
	
	public MineField(Difficulty d, BoardSize s){
		diff = d;
		size = s;
		neww();
	}
	
	
	public void neww(String...args){
		if (args.length == 2){
			size = BoardSize.valueOf(args[0].toUpperCase());
			diff = Difficulty.valueOf(args[1].toUpperCase());
		}
		generateMines();
		setSafeSpots();
	}
	
	public int[][] getField(){
		return field;
	}
	
	public int getSize(){
		return size.getSize();
	}
	

	
	
	/** PRIVATE **/
	
	

	
	private void generateMines(){		
		int sizeInt = size.getSize();	
		field = new int[sizeInt][sizeInt];			
		for(int i=0; i < sizeInt; i++){
			for(int j=0; j < sizeInt; j++){
				field[i][j] = randBoolByDifficulty() ? -1 : 0;
			}
		}
	}
	
	private void setSafeSpots(){
		int sizeInt = size.getSize();
		for(int i=0; i < sizeInt; i++){
			for(int j=0; j < sizeInt; j++){
				if(field[i][j] != -1) field[i][j] = getNeighbors(i,j);
			}
		}
	}
	
	
	private boolean randBoolByDifficulty(){
		return (Math.random() * (size.getSize() * diff.getDiff())) < size.getSize();
	}
	
	
	private int getNeighbors(int i, int j){
		int val = 0;
		for (int k = i-1; k <= i+1; k++){
			for (int l = j-1; l <= j+1; l++){
				try{
					if(field[k][l] == -1) val++;
				}catch(ArrayIndexOutOfBoundsException e){}
			}
		}
		return val;
	}

	
	
}
