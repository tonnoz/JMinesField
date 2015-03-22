package com.mines.main;

import com.mines.domain.enums.BoardSize;
import com.mines.domain.enums.Difficulty;
/**
 * Singleton class generator
 * @author Tonino Catapano
 *
 */
public class MineFieldGenerator {

	private static MineField instance = null;
	protected MineFieldGenerator() {} // Exists only to defeat instantiation.
	
	public static MineField getInstance() {
		if(instance == null) {
			instance = new MineField();
	    }
	    return instance;
	}
	
	public static MineField getInstance(Difficulty d, BoardSize s) {
		if(instance == null) {
			instance = new MineField(d,s);
	    }
	    return instance;
	}
	
}
